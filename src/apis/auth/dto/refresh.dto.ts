import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({ required: true, example: 'JWTtoken' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
