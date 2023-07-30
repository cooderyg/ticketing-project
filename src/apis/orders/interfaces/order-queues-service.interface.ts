import { HttpException } from '@nestjs/common';
import { Order } from '../entities/order.entity';

export interface IOrdersServiceCreateQueue extends IOrdersServiceCreate {
  uuid: string;
}

export interface IwaitResultReturn {
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

export interface IOrderQueuesServiceListener {
  success: boolean;
  error?: HttpException;
  order?: Order;
}
