import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ required: true, example: '뮤지컬', type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
