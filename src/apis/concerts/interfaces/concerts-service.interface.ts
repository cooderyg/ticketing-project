import { CreateConcertDto } from '../dto/create-concert.dto';

export interface IConcertsServiceFindConcerts {
  page: string;
}

export interface IConcertsServiceFindById {
  concertId: string;
}

export interface IConcertsServiceSearchByNameAndCategory {
  name: string;
  page: string;
}

export interface IConcertsServiceCreate {
  userId: string;
  createConcertDto: CreateConcertDto;
}
