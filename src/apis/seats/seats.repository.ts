import { EntityManager, In, Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatsRepository {
  constructor(
    @InjectRepository(Seat)
    private readonly seatsRepository: Repository<Seat>, //
  ) {}

  async findSeatsByConcertId({ concertId }: ISeatsRepositoryFindSeatsByConcertId): Promise<Seat[]> {
    return await this.seatsRepository.find({
      where: {
        concert: {
          id: concertId,
        },
      },
    });
  }

  async create({ creatTemp }: ISeatRepositoryCreate): Promise<void> {
    await this.seatsRepository.insert(creatTemp);
  }

  async findSeatsWithManager({ manager, seatIds }): Promise<Seat[]> {
    return await manager.find(Seat, {
      lock: { mode: 'pessimistic_write' },
      where: { id: In(seatIds) },
    });
  }

  async seatsSoldOutWithManager({ manager, seats, isCancel }: ISeatsRepositorySeatsSoldOutWithManager): Promise<void> {
    if (isCancel) {
      await manager.update(Seat, seats, { isSoldOut: false });
    } else {
      await manager.update(Seat, seats, { isSoldOut: true });
    }
  }
}

interface ISeatsRepositoryFindSeatsByConcertId {
  concertId: string;
}

interface ISeatRepositoryCreate {
  creatTemp: ICreateTemp[];
}

interface ICreateTemp {
  grade: string;
  price: number;
  seatNum: number;
}
interface ISeatsRepositorySeatsSoldOutWithManager {
  manager: EntityManager;
  seats: Seat[];
  isCancel: boolean;
}
