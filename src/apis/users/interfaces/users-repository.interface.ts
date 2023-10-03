import { EntityManager } from 'typeorm';
import { ROLE, User } from '../entities/user.entity';

export interface IUsersRepositoryFindOneByEmail {
  email: string;
}

export interface IUsersRepositoryCreateUser {
  email: string;
  password: string;
  nickname: string;
  role: ROLE;
}

export interface IUserRepositoryFindProfile {
  userId: string;
}

export interface IUsersRepositoryFindUsersById {
  manager: EntityManager;
  userIds: string[];
  isQueue: boolean;
}

export interface IUserRepositoryUpdateNickname {
  userId: string;
  nickname: string;
}

export interface IUsersRepositoryUserPointTransaction {
  manager: EntityManager;
  user: User;
  hostUser: User;
  amount: number;
  isCancel: boolean;
}
