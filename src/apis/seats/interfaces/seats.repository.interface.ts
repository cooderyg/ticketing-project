import { EntityManager } from 'typeorm';
import { Seat } from '../entities/seat.entity';

export interface ISeatsRepositoryFindSeatsWithManager {
  isQueue: boolean;
  manager: EntityManager;
  seatIds: string[];
}

export interface ISeatsRepositoryFindSeatsByConcertId {
  concertId: string;
}

export interface ISeatRepositoryCreate {
  creatTemp: ICreateTemp[];
}

export interface ICreateTemp {
  grade: string;
  price: number;
  seatNum: number;
}
export interface ISeatsRepositorySeatsSoldOutWithManager {
  manager: EntityManager;
  seats: Seat[];
  isCancel: boolean;
}
