import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { AGEKLIMIT } from '../entities/concert.entity';

export class SeatInfoDto {
  @IsString()
  grade: string;

  @IsNumber()
  price: number;

  @IsNumber()
  seatNumMax: number;
}

export class CreateConcertDto {
  @ApiProperty({ required: true, example: 'uuid', type: 'string' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ required: true, example: '싸이의 흠뻑쑈', type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: '흠뻑 젖을 준비 되셨나요?!!', type: 'string' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true, example: 'image/imageurl', type: 'string' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ required: true, example: '서울특별시 중구 세종대왕로 11번길', type: 'string' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true, example: 600, type: 'number' })
  @IsNumber()
  @IsNotEmpty()
  runningTime: number;

  @ApiProperty({ required: true, example: 'SEVEN', type: 'enum' })
  @IsEnum(AGEKLIMIT)
  @IsNotEmpty()
  ageLimit: AGEKLIMIT;

  @ApiProperty({ required: true, example: 1691636400, type: 'number' })
  @Transform((param) => new Date(param.value))
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ required: true, example: 1691636400, type: 'number' })
  @Transform((param) => new Date(param.value))
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ required: true, example: 1691636400, type: 'number' })
  @Transform((param) => new Date(param.value))
  @IsDate()
  @IsNotEmpty()
  concertDate: Date;

  @ApiProperty({
    required: true,
    example: [
      { grade: 'a', price: 30000, seatNumMax: 50 },
      { grade: 'b', price: 50000, seatNumMax: 50 },
    ],
    type: 'array',
    isArray: true,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => SeatInfoDto)
  seatInfo: SeatInfoDto[];
}
