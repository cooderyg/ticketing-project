import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository, //
  ) {}

  async createUser({ createUserDto }: IUsersServiceCreateUser): Promise<User> {
    const { email, password, nickname, role } = createUserDto;
    const user = await this.usersRepository.findOneByEmail({ email });

    if (user) throw new HttpException('이미 등록된 이메일입니다.', 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      nickname,
      role,
    });
    return newUser;
  }

  async findProfile({ userId }: IUsersServiceFindProfile): Promise<User> {
    return await this.usersRepository.findProfile({ userId });
  }

  async findUsersById({ userIds }: IUsersServiceFindUsersById): Promise<User[]> {
    return await this.usersRepository.findUsersById({ userIds });
  }

  async userPointTransaction({ manager, user, hostUser, amount, isCancel }: IUsersServiceUserPointTransaction): Promise<void> {
    return await this.usersRepository.userPointTransaction({ manager, user, hostUser, amount, isCancel });
  }
}

interface IUsersServiceCreateUser {
  createUserDto: CreateUserDto;
}

interface IUsersServiceFindProfile {
  userId: string;
}

interface IUsersServiceFindUsersById {
  userIds: string[];
}

interface IUsersServiceUserPointTransaction {
  manager: EntityManager;
  user: User;
  hostUser: User;
  amount: number;
  isCancel: boolean;
}
