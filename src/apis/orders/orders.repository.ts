import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ORDERSTATUS, Order } from './entities/order.entity';
import { EntityManager, Repository } from 'typeorm';
import { OrderSeat } from './entities/order-seat.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderSeat)
    private readonly orderSeatRepository: Repository<OrderSeat>,
  ) {}

  async createOrder({ manager, userId, amount, concertId }: IOrdersRepositoryCreateOrder): Promise<Order> {
    // 주문생성(총 가격 필요)
    const orderTemp = this.ordersRepository.create({
      amount,
      user: { id: userId },
      concert: { id: concertId },
    });

    return await manager.save(Order, orderTemp);
  }

  async createOrderSeat({ manager, orderId, seatIds }: IOrdersRepositoryCreateOrderSeat): Promise<void> {
    const orderSeatTemp: OrderSeat[] = [];
    seatIds.forEach((seat: string) => {
      const orderSeat: OrderSeat = this.orderSeatRepository.create({
        order: { id: orderId },
        seat: { id: seat },
      });
      orderSeatTemp.push(orderSeat);
    });
    await manager.save(OrderSeat, orderSeatTemp);
  }

  async findOne({ orderId }: IOrdersRepositoryFindOne): Promise<Order> {
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.concert', 'concert')
      .leftJoinAndSelect('concert.user', 'hostUser')
      .leftJoinAndSelect('order.orderSeats', 'orderSeat')
      .leftJoinAndSelect('orderSeat.seat', 'seat')
      .where('order.id = :id', { id: orderId })
      .getOne();
  }

  async findByUserId({ userId, page }: IOrdersRepositoryFindByUserId): Promise<Order[]> {
    console.log(userId, page);
    return await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.concert', 'concert')
      .leftJoinAndSelect('order.orderSeats', 'orderSeat')
      .leftJoinAndSelect('orderSeat.seat', 'seat')
      .where('user.id = :userId', { userId })
      .orderBy('order.createdAt', 'DESC')
      .take(10)
      .skip((page - 1) * 10)
      .getMany();
  }

  async updateStatusWithManager({ manager, status, orderId }: IOrdersRepositoryUpdateStatusWithManager): Promise<void> {
    await manager.update(Order, orderId, { status });
  }
}

interface IOrdersRepositoryCreateOrder {
  manager: EntityManager;
  amount: number;
  userId: string;
  concertId: string;
}

interface IOrdersRepositoryCreateOrderSeat {
  manager: EntityManager;
  orderId: string;
  seatIds: string[];
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
