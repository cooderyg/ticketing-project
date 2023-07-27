import { Injectable } from '@nestjs/common';
import { ConcertsRepository } from './concerts.repository';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class ConcertsService {
  constructor(
    private readonly concertsRepository: ConcertsRepository, //
    private readonly seatsService: SeatsService, //
  ) {}
  async create({ userId, createConcertDto }: IConcertsServiceCreate): Promise<Concert> {
    const { categoryId, endDate, startDate, name, concertDate, seatInfo, address, description, imageUrl } = createConcertDto;
    const changedEndDate = new Date(endDate * 1000);
    const changedStartDate = new Date(startDate * 1000);
    const changedConcertDate = new Date(concertDate * 1000);
    const concert = await this.concertsRepository.create({
      userId, //
      categoryId,
      name,
      address,
      description,
      imageUrl,
      endDate: changedEndDate,
      startDate: changedStartDate,
      concertDate: changedConcertDate,
    });

    await this.seatsService.creat({ concertId: concert.id, seatInfo });

    return concert;
  }

  async findConcerts({ page }: IConcertsServiceFindConcerts): Promise<Concert[]> {
    return await this.concertsRepository.findConcerts({ page: +page });
  }

  async findById({ concertId }: IConcertsServiceFindById) {
    return await this.concertsRepository.findById({ concertId });
  }

  async searchByNameAndCategory({ name, page }: IConcertsServiceSearchByNameAndCategory): Promise<Concert[]> {
    return await this.concertsRepository.searchByNameAndCategory({ name, page: +page });
  }
}

interface IConcertsServiceFindConcerts {
  page: string;
}

interface IConcertsServiceFindById {
  concertId: string;
}

interface IConcertsServiceSearchByNameAndCategory {
  name: string;
  page: string;
}

interface IConcertsServiceCreate {
  userId: string;
  createConcertDto: CreateConcertDto;
}
