import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true, type: 'number', example: 30000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ required: true, type: 'string', example: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  concertId: string;

  @ApiProperty({ required: true, isArray: true, type: 'array', example: "['uuid1', 'uuid2']" })
  @IsArray()
  @IsNotEmpty()
  seatIds: string[];
}
