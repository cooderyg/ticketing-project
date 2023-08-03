import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ROLE } from 'src/apis/users/entities/user.entity';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export interface UserAfterAuth {
  id: string;
  role: ROLE;
}
