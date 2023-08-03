import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ROLE } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

const role = {
  USER: 'USER',
  HOST: 'HOST',
  ADMIN: 'ADMIN',
};

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'hello@gamil.com', type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @ApiProperty({ required: true, example: 'qwert9283', type: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true, example: 'superman', type: 'string' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ required: true, example: 'USER', type: 'enum', enum: role })
  @IsNotEmpty()
  @IsEnum(role)
  role: ROLE;
}
