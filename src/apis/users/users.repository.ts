import { Injectable } from '@nestjs/common';
import { EntityManager, In, Repository } from 'typeorm';
import { ROLE, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser({ email, password, nickname, role }: IUsersRepositoryCreateUser): Promise<User> {
    return await this.usersRepository.save({
      email,
      password,
      nickname,
      role,
    });
  }

  async findOneByEmail({ email }: IUsersRepositoryFindOneByEmail): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findProfile({ userId }: IUserRepositoryFindProfile): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async findUsersWithManager({ manager, userIds }: IUsersRepositoryFindUsersById): Promise<User[]> {
    return await manager.find(User, {
      where: { id: In(userIds) },
      lock: { mode: 'pessimistic_write' },
    });
  }

  async userPointTransaction({ manager, user, hostUser, amount, isCancel }: IUsersRepositoryUserPointTransaction): Promise<void> {
    if (isCancel) {
      const updatedHostUser = this.usersRepository.create({
        ...hostUser,
        point: hostUser.point - amount,
      });

      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await manager.save(User, [updatedUser, updatedHostUser]);
    } else {
      const updatedHostUser = this.usersRepository.create({
        ...hostUser,
        point: hostUser.point + amount,
      });

      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point - amount,
      });

      await manager.save(User, [updatedUser, updatedHostUser]);
    }
  }
}

interface IUsersRepositoryFindOneByEmail {
  email: string;
}

interface IUsersRepositoryCreateUser {
  email: string;
  password: string;
  nickname: string;
  role: ROLE;
}

interface IUserRepositoryFindProfile {
  userId: string;
}

interface IUsersRepositoryFindUsersById {
  manager: EntityManager;
  userIds: string[];
}

interface IUsersRepositoryUserPointTransaction {
  manager: EntityManager;
  user: User;
  hostUser: User;
  amount: number;
  isCancel: boolean;
}
