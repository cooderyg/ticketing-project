import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfileImageDto {
  @ApiProperty({ required: true, example: 'image.png', type: 'string' })
  @IsString()
  profileImageUrl: string;
}
