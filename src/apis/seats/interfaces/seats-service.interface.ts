import { SeatInfoDto } from 'src/apis/concerts/dto/create-concert.dto';
import { EntityManager } from 'typeorm';
import { Seat } from '../entities/seat.entity';

export interface ISeatsServiceFindSeatsByConcertId {
  concertId: string;
}

export interface ISeatsServiceCreate {
  concertId: string;
  seatInfo: SeatInfoDto[];
}

export interface ISeatsServicefindSeatsWithManager {
  manager: EntityManager;
  seatIds: string[];
  isQueue: boolean;
}

export interface ISeatsServiceSeatsSoldOutWithManager {
  manager: EntityManager;
  seats: Seat[];
  isCancel: boolean;
}
