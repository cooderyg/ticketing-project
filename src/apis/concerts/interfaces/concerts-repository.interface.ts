import { OmitType } from '@nestjs/swagger';
import { CreateConcertDto } from '../dto/create-concert.dto';

export class SaveConcertDto extends OmitType(CreateConcertDto, ['seatInfo']) {}

export interface IConcertsRepositoryCreate {
  userId: string;
  saveConcertDto: SaveConcertDto;
}

export interface IConcertsRepositoryFindConcerts {
  page: number;
  size: number;
}

export interface IConcertsRepositoryFindById {
  concertId: string;
}

export interface IConcertsRepositoryFindOneIsNotSoldOut {
  concertId: string;
}

export interface IConcertsRepositorySearchByNameAndCategory {
  keyword: string;
  page: number;
  size: number;
}
