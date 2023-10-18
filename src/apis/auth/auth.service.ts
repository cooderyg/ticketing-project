import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceCreateRefreshTokenEntity,
  IAuthServiceGetAccessToken,
  IAuthServiceGetRefreshToken,
  IAuthServiceLogin,
  IAuthServiceLoginReturn,
  IAuthServiceRefresh,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import { RefreshResDto } from './dto/res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login({ loginDto }: IAuthServiceLogin): Promise<IAuthServiceLoginReturn> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail({ email });

    if (!user) throw new UnauthorizedException('해당하는 email에 일치하는 유저가 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    console.log(isAuth);
    if (!isAuth) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    const accessToken = this.getAccessToken({ user });
    const refreshToken = this.getRefreshToken({ userId: user.id });
    await this.createRefreshTokenEntity({ userId: user.id, refreshToken });

    return { accessToken, refreshToken, user };
  }

  async logout({ userId }): Promise<void> {
    const refreshToken = await this.authRepository.findOneByUserId({ userId });
    if (!refreshToken) throw new BadRequestException('잘못된 요청입니다.');
    await this.authRepository.updateLogout({ refreshToken });
  }

  private getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id, roles: [user.role] }, //
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '1d' },
    );
  }

  async refresh({ token, user }: IAuthServiceRefresh): Promise<RefreshResDto> {
    const refreshTokenEntity = await this.authRepository.findOneByToken({ token });
    if (!refreshTokenEntity) throw new BadRequestException('잘못된 요청입니다.');

    const _user = await this.usersService.findProfile({ userId: user.id });
    if (!_user) throw new BadRequestException('잘못된 요청입니다.');
    const userInfo = {
      nickname: _user.nickname,
      profileImageUrl: _user.profileImageUrl,
      point: _user.point,
      role: _user.role,
    };
    const accessToken = this.getAccessToken({ user });

    return { accessToken, userInfo };
  }

  private getRefreshToken({ userId }: IAuthServiceGetRefreshToken): string {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '14d' });
  }
  private async createRefreshTokenEntity({ userId, refreshToken }: IAuthServiceCreateRefreshTokenEntity): Promise<void> {
    let refreshTokenEntity = await this.authRepository.findOneByUserId({ userId });
    if (!refreshTokenEntity) {
      refreshTokenEntity = this.authRepository.createEntity({ userId, token: refreshToken });
    } else {
      refreshTokenEntity.token = refreshToken;
    }
    await this.authRepository.update({ refreshToken: refreshTokenEntity });
  }
}
