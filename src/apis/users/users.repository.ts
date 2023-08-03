import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUserRepositoryFindProfile,
  IUsersRepositoryCreateUser,
  IUsersRepositoryFindOneByEmail,
  IUsersRepositoryFindUsersById,
  IUsersRepositoryUserPointTransaction,
} from './interfaces/users-repository.interface';

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
    return await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nickname', 'user.point'])
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async findUsersWithManager({ manager, userIds, isQueue }: IUsersRepositoryFindUsersById): Promise<User[]> {
    if (isQueue) {
      return await manager.find(User, {
        where: { id: In(userIds) },
      });
    } else {
      return await manager.find(User, {
        where: { id: In(userIds) },
        lock: { mode: 'pessimistic_write' },
      });
    }
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
