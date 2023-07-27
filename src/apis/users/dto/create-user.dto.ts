import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE } from '../entities/user.entity';

const role = {
  USER: 'USER',
  HOST: 'HOST',
  ADMIN: 'ADMIN',
};

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsEnum(role)
  role: ROLE;
}
