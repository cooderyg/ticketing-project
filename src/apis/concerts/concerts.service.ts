import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ConcertsRepository } from './concerts.repository';
import { Concert } from './entities/concert.entity';
import { SeatsService } from '../seats/seats.service';
import {
  IConcertsServiceCreate,
  IConcertsServiceFindById,
  IConcertsServiceFindConcerts,
  IConcertsServiceSearchByNameAndCategory,
} from './interfaces/concerts-service.interface';

@Injectable()
export class ConcertsService {
  constructor(
    private readonly concertsRepository: ConcertsRepository, //
    private readonly seatsService: SeatsService, //
  ) {}
  async create({ userId, createConcertDto }: IConcertsServiceCreate): Promise<Concert> {
    const { seatInfo } = createConcertDto;
    const concert = await this.concertsRepository.create({
      userId,
      createConcertDto,
    });

    await this.seatsService.creat({ concertId: concert.id, seatInfo });

    return concert;
  }

  async findConcerts({ page, size }: IConcertsServiceFindConcerts): Promise<[Concert[], number]> {
    return await this.concertsRepository.findConcerts({ page, size });
  }

  async findById({ concertId }: IConcertsServiceFindById) {
    const result = await this.concertsRepository.findById({ concertId });
    if (!result) throw new NotFoundException();
    return result;
  }

  async searchByNameAndCategory({ keyword, page, size }: IConcertsServiceSearchByNameAndCategory): Promise<[Concert[], number]> {
    return await this.concertsRepository.searchByNameAndCategory({ keyword, page, size });
  }

  async updateConcert({ updateConcertDto, concertId, userId }) {
    const concert = await this.concertsRepository.findById({ concertId });
    if (concert.user.id !== userId) throw new HttpException('수정할 권한이 없습니다.', 401);
    const updatedConcert = await this.concertsRepository.updateConcert({ concert, updateConcertDto });
    return updatedConcert;
  }
}
