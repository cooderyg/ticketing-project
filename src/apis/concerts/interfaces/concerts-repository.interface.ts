import { CreateConcertDto } from '../dto/create-concert.dto';

export interface IConcertsRepositoryCreate {
  userId: string;
  createConcertDto: CreateConcertDto;
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
