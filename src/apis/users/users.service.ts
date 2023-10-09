import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  IUserServiceUpdateNickname,
  IUsersServiceCreateUser,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindProfile,
  IUsersServiceFindUsersById,
  IUsersServiceUpdateProfileImageUrl,
  IUsersServiceUserPointTransaction,
  IUsersServiceVerifyEmail,
} from './interfaces/users-service.interface';
import { createNumber } from 'src/commons/libs/create-number';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly mailService: MailService, //
    private readonly usersRepository: UsersRepository,
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

  async verifyEmail({ verifyEmailDto }: IUsersServiceVerifyEmail): Promise<number> {
    const { email } = verifyEmailDto;
    const isExist = await this.usersRepository.findOneByEmail({ email });
    if (isExist) throw new ConflictException('이미 가입한 이메일입니다.');

    const number: number = createNumber();

    await this.mailService.sendMail({ email, number });

    return number;
  }

  async findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return await this.usersRepository.findOneByEmail({ email });
  }

  async findProfile({ userId }: IUsersServiceFindProfile): Promise<User> {
    const user = await this.usersRepository.findProfile({ userId });
    if (!user) throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    return user;
  }

  async findUsersWithManager({ manager, userIds, isQueue }: IUsersServiceFindUsersById): Promise<User[]> {
    return await this.usersRepository.findUsersWithManager({ manager, userIds, isQueue });
  }

  async updateNickname({ userId, updateNicknameDto }: IUserServiceUpdateNickname): Promise<User> {
    const { nickname } = updateNicknameDto;

    await this.findProfile({ userId });

    const updatedUser = await this.usersRepository.updateNickname({ userId, nickname });

    return updatedUser;
  }

  async updateProfileImageUrl({ userId, profileImageUrl }: IUsersServiceUpdateProfileImageUrl): Promise<void> {
    const user = await this.findProfile({ userId });

    await this.usersRepository.updateProfileImageUrl({ user, profileImageUrl });
  }

  async userPointTransaction({ manager, user, hostUser, amount, isCancel }: IUsersServiceUserPointTransaction): Promise<void> {
    return await this.usersRepository.userPointTransaction({ manager, user, hostUser, amount, isCancel });
  }
}
