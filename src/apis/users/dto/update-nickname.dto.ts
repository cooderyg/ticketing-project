import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNicknameDto {
  @ApiProperty({ required: true, example: 'superman', type: 'string' })
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
