import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import {
  IAuthRepositoryCreate,
  IAuthRepositoryCreateEntity,
  IAuthRepositoryFindOneByToken,
  IAuthRepositoryFindOneByUserId,
  IAuthRepositoryUpdate,
} from './interfaces/auth-repository.interfaces';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
  ) {}

  async findOneByUserId({ userId }: IAuthRepositoryFindOneByUserId): Promise<RefreshToken> {
    return await this.refreshRepository.findOneBy({ user: { id: userId } });
  }

  async findOneByToken({ token }: IAuthRepositoryFindOneByToken): Promise<RefreshToken> {
    return await this.refreshRepository.findOneBy({ token });
  }

  async create({ refreshTokenEntity }: IAuthRepositoryCreate): Promise<void> {
    await this.refreshRepository.save(refreshTokenEntity);
  }

  createEntity({ userId, token }: IAuthRepositoryCreateEntity): RefreshToken {
    return this.refreshRepository.create({ user: { id: userId }, token });
  }

  async update({ refreshToken }: IAuthRepositoryUpdate): Promise<void> {
    await this.refreshRepository.save(refreshToken);
  }

  async updateLogout({ refreshToken }: IAuthRepositoryUpdate): Promise<void> {
    await this.refreshRepository.save({
      ...refreshToken,
      token: '',
    });
  }
}
