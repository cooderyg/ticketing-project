import { Injectable } from '@nestjs/common';
import { SeatsRepository } from './seats.repository';
import { SeatInfoDto } from '../concert/dto/create-concert.dto';
import { Seat } from './entities/seat.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class SeatsService {
  constructor(
    private readonly seatsRepository: SeatsRepository, //
  ) {}
  async findSeatsByConcertId({ concertId }: ISeatsServiceFindSeatsByConcertId): Promise<Seat[]> {
    return await this.seatsRepository.findSeatsByConcertId({ concertId });
  }

  async creat({ concertId, seatInfo }: ISeatsServiceCreate): Promise<void> {
    const creatTemp = [];
    seatInfo.forEach((el) => {
      for (let i = 1; i < el.seatNumMax + 1; i++) {
        const temp = {
          concert: { id: concertId },
          grade: el.grade,
          price: el.price,
          seatNum: i,
        };
        creatTemp.push(temp);
      }
    });
    // console.log(creatTemp);
    await this.seatsRepository.create({ creatTemp });
  }

  async findSeatsWithManager({ manager, seatIds, isQueue }: ISeatsServicefindSeatsWithManager): Promise<Seat[]> {
    return await this.seatsRepository.findSeatsWithManager({ manager, seatIds, isQueue });
  }

  async seatsSoldOutWithManager({ manager, seats, isCancel }: ISeatsServiceSeatsSoldOutWithManager): Promise<void> {
    await this.seatsRepository.seatsSoldOutWithManager({ manager, seats, isCancel });
  }
}

interface ISeatsServiceFindSeatsByConcertId {
  concertId: string;
}

interface ISeatsServiceCreate {
  concertId: string;
  seatInfo: SeatInfoDto[];
}

interface ISeatsServicefindSeatsWithManager {
  manager: EntityManager;
  seatIds: string[];
  isQueue: boolean;
}

interface ISeatsServiceSeatsSoldOutWithManager {
  manager: EntityManager;
  seats: Seat[];
  isCancel: boolean;
}
