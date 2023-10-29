import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Concert } from '../entities/concert.entity';

export class CreateConcertResDto extends OmitType(Concert, ['category', 'seats', 'orders', 'user']) {
  @ApiProperty({ required: true })
  user: { id: string };

  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  category: { id: string };
}

export class FindByIdResDto extends Concert {}

export class FindResConcert extends OmitType(Concert, ['updatedAt', 'deletedAt', 'orders', 'seats', 'category', 'user']) {
  @ApiProperty({ example: '{ name: "뮤지컬" }', description: '카테고리 이름', required: true })
  category: {
    name: string;
  };
}

export class FindConcertsResDto {
  @ApiProperty({ example: '{ name: "뮤지컬" }', description: '카테고리 이름', required: true })
  concerts: FindResConcert[];

  @ApiProperty({ example: '10', description: '총 콘서트 개수', required: true })
  count: number;

  @ApiProperty({ example: '1', description: '페이지', required: true })
  page: number;

  @ApiProperty({ example: 'true', description: '이후 페이지 존재 여부', required: true })
  hasNextPage: boolean;
}

export class SearchConcertResDto extends FindConcertsResDto {}

export class UpdateConcertResDto extends CreateConcertResDto {}
