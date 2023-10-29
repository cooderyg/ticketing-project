import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';
import {
  IConcertsRepositoryCreate,
  IConcertsRepositoryFindById,
  IConcertsRepositoryFindConcerts,
  IConcertsRepositoryFindOneIsNotSoldOut,
  IConcertsRepositorySearchByNameAndCategory,
} from './interfaces/concerts-repository.interface';

@Injectable()
export class ConcertsRepository {
  constructor(
    @InjectRepository(Concert)
    private readonly concertsRepository: Repository<Concert>,
  ) {}

  //-----------------------------생성-----------------------------//

  async create({
    userId, //
    createConcertDto,
  }: IConcertsRepositoryCreate): Promise<Concert> {
    const { categoryId, ...rest } = createConcertDto;

    return await this.concertsRepository.save({
      user: { id: userId },
      category: { id: categoryId },
      ...rest,
    });
  }

  //-----------------------------조회-----------------------------//

  async findConcerts({ page, size }: IConcertsRepositoryFindConcerts): Promise<[Concert[], number]> {
    return await this.concertsRepository // 카테고리 이름, 콘서트 이름, 좌석정보? 이건필요? 상세 때만 넣기?
      .createQueryBuilder('concert')
      .select([
        'concert.id',
        'concert.name',
        'concert.description',
        'concert.address',
        'concert.ageLimit',
        'concert.startDate',
        'concert.endDate',
        'concert.concertDate',
        'concert.imageUrl',
        'concert.createdAt',
        'category.name',
      ])
      .leftJoin('concert.category', 'category')
      .orderBy({ 'concert.createdAt': 'DESC' })
      .take(size)
      .skip((page - 1) * size)
      .getManyAndCount();
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

  async searchByNameAndCategory({ keyword, page, size }: IConcertsRepositorySearchByNameAndCategory): Promise<[Concert[], number]> {
    return await this.concertsRepository
      .createQueryBuilder('concert')
      .select([
        'concert.id',
        'concert.name',
        'concert.description',
        'concert.address',
        'concert.ageLimit',
        'concert.startDate',
        'concert.endDate',
        'concert.concertDate',
        'concert.imageUrl',
        'category.name',
      ])
      .leftJoin('concert.category', 'category')
      .where('concert.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('category.name LIKE :category', { category: `%${keyword}%` })
      .orderBy({ 'concert.createdAt': 'DESC' })
      .take(size)
      .skip((page - 1) * size)
      .getManyAndCount();
  }

  //-----------------------------수정-----------------------------//
  async updateConcert({ concert, updateConcertDto }) {
    return await this.concertsRepository.save({ ...concert, ...updateConcertDto });
  }
}
