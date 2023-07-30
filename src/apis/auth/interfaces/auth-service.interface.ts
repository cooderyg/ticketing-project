import { User } from 'src/apis/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

export interface IAuthServiceLogin {
  loginDto: LoginDto;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}
