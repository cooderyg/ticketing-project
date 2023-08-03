import { EntityManager } from 'typeorm';
import { ORDERSTATUS } from '../entities/order.entity';

export interface IOrdersRepositoryCreateOrder {
  manager: EntityManager;
  amount: number;
  userId: string;
  concertId: string;
  seatInfos: ISeatInfo[];
}

export interface ISeatInfo {
  seatId: string;
  grade: string;
  seatNum: number;
}

export interface IOrdersRepositoryUpdateStatusWithManager {
  manager: EntityManager;
  status: ORDERSTATUS;
  orderId: string;
}

export interface IOrdersRepositoryFindOne {
  orderId: string;
}

export interface IOrdersRepositoryFindByUserId {
  userId: string;
  page: number;
  size: number;
}
