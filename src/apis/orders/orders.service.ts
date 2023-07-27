import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ORDERSTATUS, Order } from './entities/order.entity';
import { DataSource } from 'typeorm';
import { ConcertsService } from '../concert/concerts.service';
import { UsersService } from '../users/users.service';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly seatsService: SeatsService,
    private readonly ordersRepository: OrdersRepository,
    private readonly concertsService: ConcertsService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create({ concertId, userId, amount, seatIds }): Promise<string> {
    const concert = await this.concertsService.findById({ concertId });
    console.log(`콘서트 ${concert}`);
    if (!concert) throw new HttpException('해당 콘서트를 찾을 수 없습니다.', 404);
    const hostId = concert.user.id;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 트랜젝션
      const manager = queryRunner.manager;

      const seats = await this.seatsService.findSeatsWithManager({ manager, seatIds });

      const filteredSeats = seats.filter((seat) => seat.isSoldOut);
      console.log(filteredSeats);
      if (filteredSeats.length) throw new ConflictException('이미 판매된 좌석입니다.');

      const order = await this.ordersRepository.createOrder({ manager, userId, amount, concertId });

      // 주문좌석 생성(좌석 ID필요)
      const orderSeats = await this.ordersRepository.createOrderSeat({ manager, orderId: order.id, seatIds });
      console.log(orderSeats);
      // 유저 돈 차감 호스트 돈 증가

      const [user, hostUser] = await Promise.all([
        this.usersService.findOneWithManager({ manager, id: userId }),
        this.usersService.findOneWithManager({ manager, id: hostId }),
      ]);
      if (user.point < amount) throw new HttpException('포인트 잔액이 부족합니다.', 400);

      await Promise.all([
        this.usersService.userPointTransaction({ manager, user, hostUser, amount, isCancel: false }),
        this.seatsService.seatsSoldOutWithManager({ manager, seats, isCancel: false }),
      ]);

      await queryRunner.commitTransaction();
      return '결제가 성공적으로 완료되었습니다.';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error.message);
      throw new HttpException(error.message, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async orderCancel({ orderId, userId }) {
    const order = await this.ordersRepository.findOne({ orderId });
    if (order.user.id !== userId) throw new HttpException('주문취소 권한이 없습니다', 401);
    const orderSeats = order.orderSeats;

    const nowTime = new Date().getTime();
    const ticketingEndTime = new Date(order.concert.endDate).getTime() - 60 * 60 * 3;

    if (nowTime > ticketingEndTime) throw new ConflictException('취소가능 시간을 초과하였습니다.');

    const seatIds = orderSeats.map((orderSeat) => orderSeat.seat.id);
    const hostId = order.concert.user.id;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const manager = queryRunner.manager;

      // 좌석상태
      const seats = await this.seatsService.findSeatsWithManager({ manager, seatIds });
      const filteredSeats = seats.filter((seat) => !seat.isSoldOut);
      if (filteredSeats.length) throw new ConflictException('이미 취소된 주문입니다.');

      // 유저, 호스트 돈 증감
      const [user, hostUser] = await Promise.all([
        this.usersService.findOneWithManager({ manager, id: userId }),
        this.usersService.findOneWithManager({ manager, id: hostId }),
      ]);

      await Promise.all([
        this.usersService.userPointTransaction({ manager, user, hostUser, amount: order.amount, isCancel: true }),
        this.seatsService.seatsSoldOutWithManager({ manager, seats, isCancel: true }),
        this.ordersRepository.updateStatusWithManager({ manager, orderId, status: ORDERSTATUS.CANCEL }),
      ]);

      await queryRunner.commitTransaction();
      return '결제취소가 성공적으로 완료되었습니다.';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error.message);
      throw new HttpException(error.message, error.status);
    } finally {
      await queryRunner.release();
    }
  }

  async findByUserId({ userId, page }): Promise<Order[]> {
    return await this.ordersRepository.findByUserId({ userId, page });
  }
}
