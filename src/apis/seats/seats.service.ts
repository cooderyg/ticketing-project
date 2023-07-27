import { Injectable } from '@nestjs/common';
import { SeatsRepository } from './seats.repository';
import { SeatInfoDto } from '../concert/dto/create-concert.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    private readonly seatsRepository: SeatsRepository, //
  ) {}
  async findSeatsByConcertId({ concertId }) {
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
    console.log(creatTemp);
    await this.seatsRepository.create({ creatTemp });
  }

  async findSeatsWithManager({ manager, seatIds }): Promise<Seat[]> {
    return await this.seatsRepository.findSeatsWithManager({ manager, seatIds });
  }

  async seatsSoldOutWithManager({ manager, seats, isCancel }) {
    await this.seatsRepository.seatsSoldOutWithManager({ manager, seats, isCancel });
  }
}

interface ISeatsServiceCreate {
  concertId: string;
  seatInfo: SeatInfoDto[];
}
