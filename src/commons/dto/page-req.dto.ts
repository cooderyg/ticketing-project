import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class PageReqDto {
  @ApiPropertyOptional({ description: '페이지 default 1페이지' })
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지 당 갯수 default 20개' })
  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 20;
}

export class SearchReqDto extends PageReqDto {
  @ApiPropertyOptional({ description: '검색어 키워드' })
  @IsString()
  keyword: string;
}
