export interface IConcertsRepositoryCreate {
  userId: string;
  name: string;
  categoryId: string;
  address: string;
  description: string;
  imageUrl: string;
  endDate: Date;
  startDate: Date;
  concertDate: Date;
}
export interface IConcertsRepositoryFindConcerts {
  page: number;
}

export interface IConcertsRepositoryFindById {
  concertId: string;
}

export interface IConcertsRepositoryFindOneIsNotSoldOut {
  concertId: string;
}

export interface IConcertsRepositorySearchByNameAndCategory {
  name: string;
  page: number;
}
