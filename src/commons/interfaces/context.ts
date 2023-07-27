import { Request, Response } from 'express';
import { ROLE } from 'src/apis/users/entities/user.entity';

export interface IAuthUser {
  user?: {
    id: string;
    roles: ROLE[];
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}

export interface IRequest extends Request {
  user?: {
    id: string;
    roles: ROLE[];
  };
}
