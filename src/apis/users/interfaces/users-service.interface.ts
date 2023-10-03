import { EntityManager } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateNicknameDto } from '../dto/update-nickname.dto';

export interface IUsersServiceCreateUser {
  createUserDto: CreateUserDto;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceFindProfile {
  userId: string;
}

export interface IUsersServiceFindUsersById {
  manager: EntityManager;
  userIds: string[];
  isQueue: boolean;
}

export interface IUserServiceUpdateNickname {
  userId: string;
  updateNicknameDto: UpdateNicknameDto;
}

export interface IUsersServiceUserPointTransaction {
  manager: EntityManager;
  user: User;
  hostUser: User;
  amount: number;
  isCancel: boolean;
}
