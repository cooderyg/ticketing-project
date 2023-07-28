import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ORDERSTATUS, Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async createOrder({ manager, userId, amount, concertId, seatInfos }: IOrdersRepositoryCreateOrder): Promise<Order> {
    // 주문생성(총 가격 필요)
    const orderTemp = this.ordersRepository.create({
      amount,
      seatInfos,
      user: { id: userId },
      concert: { id: concertId },
    });

    return await manager.save(Order, orderTemp);
  }

  async findOne({ orderId }: IOrdersRepositoryFindOne): Promise<Order> {
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.concert', 'concert')
      .leftJoinAndSelect('concert.user', 'hostUser')
      .where('order.id = :id', { id: orderId })
      .getOne();
  }

  async findByUserId({ userId, page }: IOrdersRepositoryFindByUserId): Promise<Order[]> {
    console.log(userId, page);
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.concert', 'concert')
      .where('user.id = :userId', { userId })
      .orderBy('order.createdAt', 'DESC')
      .take(10)
      .skip((page - 1) * 10)
      .getMany();
  }

  async updateStatusWithManager({ manager, status, orderId }: IOrdersRepositoryUpdateStatusWithManager): Promise<Order> {
    return await manager.save(Order, { id: orderId, status });
  }
}

interface IOrdersRepositoryCreateOrder {
  manager: EntityManager;
  amount: number;
  userId: string;
  concertId: string;
  seatInfos: ISeatInfo[];
}

interface ISeatInfo {
  seatId: string;
  grade: string;
  seatNum: number;
}

interface IOrdersRepositoryUpdateStatusWithManager {
  manager: EntityManager;
  status: ORDERSTATUS;
  orderId: string;
}

interface IOrdersRepositoryFindOne {
  orderId: string;
}

interface IOrdersRepositoryFindByUserId {
  userId: string;
  page: number;
}
