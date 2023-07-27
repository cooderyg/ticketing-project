import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class SeatInfoDto {
  @IsString()
  grade: string;

  @IsNumber()
  price: number;

  @IsNumber()
  seatNumMax: number;
}

export class CreateConcertDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  startDate: number;

  @IsNumber()
  @IsNotEmpty()
  endDate: number;

  @IsNumber()
  @IsNotEmpty()
  concertDate: number;

  @IsArray()
  @ValidateNested()
  @Type(() => SeatInfoDto)
  seatInfo: SeatInfoDto[];
}
