import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { ROLE, User } from '../users/entities/user.entity';
import { SeatsService } from '../seats/seats.service';
import { OrdersRepository } from './orders.repository';
import { ConcertsService } from '../concert/concerts.service';
import { UsersService } from '../users/users.service';
import { DataSource } from 'typeorm';
import { Queue } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { v4 } from 'uuid';
import { IOrdersServiceCreateQueue, IwaitFinishReturn } from './interfaces/order-queues-service.interface';
import { IOrdersServiceCreate } from './interfaces/orders-service.interface';

@Injectable()
export class OrderQueuesService {
  constructor(
    private readonly seatsService: SeatsService,
    private readonly ordersRepository: OrdersRepository,
    private readonly concertsService: ConcertsService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    @InjectQueue('orderQueue')
    private readonly orderQueue: Queue,
    private eventEmitter: EventEmitter2,
  ) {}

  async addorderQueue({ concertId, userId, amount, seatIds }: IOrdersServiceCreate): Promise<Order> {
    const uuid = v4();
    await this.orderQueue.add(
      'addOrderQueue', //
      { concertId, userId, amount, seatIds, uuid },
      { removeOnComplete: true, removeOnFail: true, jobId: uuid },
    );
    const result = await this.waitFinish({ uuid });
    console.log(result);
    if (result?.error) throw result.error;
    if (result.message === '대기시간을 초과했습니다. 다시 시도해주세요.') throw new HttpException('대기시간을 초과했습니다. 다시 시도해주세요.', 500);
    return result.order;
  }

  async create({ concertId, userId, amount, seatIds, uuid }: IOrdersServiceCreateQueue): Promise<void> {
    const concert = await this.concertsService.findById({ concertId });

    if (!concert) throw new HttpException('해당 콘서트를 찾을 수 없습니다.', 404);
    const hostId = concert.user.id;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 트랜젝션
      const manager = queryRunner.manager;

      const users = await this.usersService.findUsersWithManager({ manager, userIds: [userId, hostId], isQueue: true });
      let user: User;
      let hostUser: User;
      if (users[0].role === ROLE.USER) {
        user = users[0];
        hostUser = users[1];
      } else {
        user = users[1];
        hostUser = users[0];
      }
      if (user.point < amount) throw new HttpException('포인트 잔액이 부족합니다.', 400);
      await this.usersService.userPointTransaction({ manager, user, hostUser, amount, isCancel: false });

      const seats = await this.seatsService.findSeatsWithManager({ manager, seatIds, isQueue: true });

      const filteredSeats = seats.filter((seat) => seat.isSoldOut);

      if (filteredSeats.length) throw new ConflictException('이미 판매된 좌석입니다.');

      const seatInfos = seats.map((seat) => {
        return {
          seatId: seat.id,
          grade: seat.grade,
          seatNum: seat.seatNum,
        };
      });

      await this.seatsService.seatsSoldOutWithManager({ manager, seats, isCancel: false });

      const order = await this.ordersRepository.createOrder({ manager, userId, amount, concertId, seatInfos });
      await queryRunner.commitTransaction();
      this.eventEmitter.emit(uuid, { success: true, order });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.eventEmitter.emit(uuid, { success: false, error });
    } finally {
      await queryRunner.release();
      return;
    }
  }

  private waitFinish({ uuid }): Promise<IwaitFinishReturn> {
    return new Promise((resolve, reject) => {
      const wait = setTimeout(() => {
        this.eventEmitter.removeAllListeners(uuid);
        resolve({ message: '대기시간을 초과했습니다. 다시 시도해주세요.' });
      }, 1000); // 대기열 시간을 길게 가져가려면 해당 부분을 길게 가져가면 됨
      const listenFn = ({ success, error, order }: { success: boolean; error?: HttpException; order: Order }) => {
        clearTimeout(wait);
        success ? resolve({ message: '주문성공', order }) : reject(error);
      };
      this.eventEmitter.addListener(uuid, listenFn);
    });
  }
}
