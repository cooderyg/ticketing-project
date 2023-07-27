import { In, Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatsRepository {
  constructor(
    @InjectRepository(Seat)
    private readonly seatsRepository: Repository<Seat>, //
  ) {}

  async findSeatsByConcertId({ concertId }) {
    return await this.seatsRepository.find({
      where: {
        concert: {
          id: concertId,
        },
      },
    });
  }

  async create({ creatTemp }: ISeatRepositoryCreate) {
    await this.seatsRepository.insert(creatTemp);
  }

  async findSeatsWithManager({ manager, seatIds }): Promise<Seat[]> {
    return await manager.find(Seat, {
      lock: { mode: 'pessimistic_write' },
      where: { id: In(seatIds) },
    });
  }

  async seatsSoldOutWithManager({ manager, seats, isCancel }) {
    if (isCancel) {
      manager.update(Seat, seats, { isSoldOut: false });
    } else {
      manager.update(Seat, seats, { isSoldOut: true });
    }
  }
}

interface ISeatRepositoryCreate {
  creatTemp: ICreateTemp[];
}

interface ICreateTemp {
  grade: string;
  price: number;
  seatNum: number;
}
