import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConcertsRepository {
  constructor(
    @InjectRepository(Concert)
    private readonly concertsRepository: Repository<Concert>,
  ) {}

  //-----------------------------생성-----------------------------//

  async create({
    userId, //
    categoryId,
    name,
    address,
    description,
    imageUrl,
    endDate,
    startDate,
    concertDate,
  }: IConcertsRepositoryCreate): Promise<Concert> {
    return await this.concertsRepository.save({
      user: { id: userId },
      category: { id: categoryId },
      name,
      address,
      description,
      imageUrl,
      concertDate,
      startDate,
      endDate,
    });
  }

  //-----------------------------조회-----------------------------//

  async findConcerts({ page }: IConcertsRepositoryFindConcerts): Promise<Concert[]> {
    return await this.concertsRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.category', 'category')
      .leftJoinAndSelect('concert.seats', 'seat')
      .orderBy({ 'concert.createdAt': 'DESC', 'seat.grade': 'ASC', 'seat.seatNum': 'ASC' })
      .take(12)
      .skip((page - 1) * 12)
      .getMany();
  }

  async findById({ concertId }: IConcertsRepositoryFindById): Promise<Concert> {
    return await this.concertsRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.seats', 'seat')
      .leftJoinAndSelect('concert.user', 'user')
      .where('concert.id = :concertId', { concertId })
      .orderBy({ 'seat.grade': 'ASC', 'seat.seatNum': 'ASC' })
      .getOne();
  }

  async findOneIsNotSoldOut({ concertId }: IConcertsRepositoryFindOneIsNotSoldOut): Promise<Concert> {
    return await this.concertsRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.seats', 'seat')
      .leftJoinAndSelect('concert.user', 'user')
      .where('concert.id = :concertId', { concertId })
      .andWhere('seat.isSoldOut = isSoldOut', { isSoldOut: false })
      .orderBy({ 'seat.grade': 'ASC', 'seat.seatNum': 'ASC' })
      .getOne();
  }

  async searchByNameAndCategory({ name, page }: IConcertsRepositorySearchByNameAndCategory): Promise<Concert[]> {
    return await this.concertsRepository
      .createQueryBuilder('concert')
      .leftJoinAndSelect('concert.category', 'category')
      .where('concert.name LIKE :name', { name: `%${name}%` })
      .orWhere('category.name LIKE :category', { category: `%${name}%` })
      .orderBy({ 'concert.createdAt': 'DESC' })
      .take(12)
      .skip((page - 1) * 12)
      .getMany();
  }
}

interface IConcertsRepositoryCreate {
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
interface IConcertsRepositoryFindConcerts {
  page: number;
}

interface IConcertsRepositoryFindById {
  concertId: string;
}

interface IConcertsRepositoryFindOneIsNotSoldOut {
  concertId: string;
}

interface IConcertsRepositorySearchByNameAndCategory {
  name: string;
  page: number;
}
