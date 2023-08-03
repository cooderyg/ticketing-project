import { CreateConcertDto } from '../dto/create-concert.dto';

export interface IConcertsServiceFindConcerts {
  page: number;
  size: number;
}

export interface IConcertsServiceFindById {
  concertId: string;
}

export interface IConcertsServiceSearchByNameAndCategory {
  keyword: string;
  page: number;
  size: number;
}

export interface IConcertsServiceCreate {
  userId: string;
  createConcertDto: CreateConcertDto;
}
