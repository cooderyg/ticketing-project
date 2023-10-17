import { User } from 'src/apis/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { UserAfterAuth } from 'src/commons/decorators/user.decoreator';

export interface IAuthServiceLogin {
  loginDto: LoginDto;
}

export interface IAuthServiceGetAccessToken {
  user: User | UserAfterAuth;
}

export interface IAuthServiceLoginReturn {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface IAuthServiceRefresh {
  token: string;
  user: UserAfterAuth;
}

export interface IAuthServiceGetRefreshToken {
  userId: string;
}

export interface IAuthServiceCreateRefreshTokenEntity {
  userId: string;
  refreshToken: string;
}
