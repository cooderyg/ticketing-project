import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository, //
    private readonly jwtService: JwtService,
  ) {}
  async login({ loginDto }: IAuthServiceLogin): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOneByEmail({ email });

    if (!user) throw new HttpException('해당하는 email에 일치하는 유저가 없습니다.', 404);
    const isAuth = await bcrypt.compare(password, user.password);
    console.log(isAuth);
    if (!isAuth) throw new HttpException('비밀번호가 일치하지 않습니다.', 401);

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id, roles: [user.role] }, //
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '12h' },
    );
  }
}

interface IAuthServiceLogin {
  loginDto: LoginDto;
}

interface IAuthServiceGetAccessToken {
  user: User;
}
