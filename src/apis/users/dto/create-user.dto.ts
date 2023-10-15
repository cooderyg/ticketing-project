import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ROLE } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEqualTo } from 'src/commons/decorators/match.decorator';

const role = {
  USER: 'USER',
  HOST: 'HOST',
  ADMIN: 'ADMIN',
};

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'hello@gamil.com', type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'qwert9283', type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty({ required: true, example: 'qwert9283', type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsEqualTo<CreateUserDto>('password')
  confirmPassword: string;

  @ApiProperty({ required: true, example: 'superman', type: 'string' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ required: true, example: 'USER', type: 'enum', enum: role })
  @IsNotEmpty()
  @IsEnum(role)
  role: ROLE;
}
