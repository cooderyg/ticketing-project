import { HttpException } from '@nestjs/common';
import { Order } from '../entities/order.entity';

export interface IOrdersServiceCreateQueue extends IOrdersServiceCreate {
  uuid: string;
}

export interface IwaitFinishReturn {
  message?: string;
  error?: HttpException;
  order?: Order;
}

export interface IOrdersServiceCreate {
  concertId: string;
  userId: string;
  amount: number;
  seatIds: string[];
}
