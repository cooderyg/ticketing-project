import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ROLE, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser = async ({ email, password, nickname, role }: IUsersRepositoryCreateUser): Promise<User> => {
    return await this.usersRepository.save({
      email,
      password,
      nickname,
      role,
    });
  };

  findOneByEmail = async ({ email }: IUsersRepositoryFindOneByEmail): Promise<User> => {
    return await this.usersRepository.findOne({ where: { email } });
  };

  async findProfile({ userId }: IUserRepositoryFindProfile): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async findOneWithManager({ manager, id }): Promise<User> {
    return await manager.findOne(User, {
      where: { id },
    });
  }

  async userPointTransaction({ manager, user, hostUser, amount, isCancel }) {
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
      console.log(updatedUser);
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
