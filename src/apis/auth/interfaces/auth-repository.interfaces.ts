import { RefreshToken } from '../entities/refresh-token.entity';

export interface IAuthRepositoryFindOneByUserId {
  userId: string;
}
export interface IAuthRepositoryFindOneByToken {
  token: string;
}
export interface IAuthRepositoryCreateEntity {
  userId: string;
  token: string;
}

export interface IAuthRepositoryCreate {
  refreshTokenEntity: RefreshToken;
}

export interface IAuthRepositoryUpdate {
  refreshToken: RefreshToken;
}
