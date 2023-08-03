import { UseGuards, applyDecorators } from '@nestjs/common';
import { HasRoles } from 'src/apis/auth/decorators/roles.decorator';
import { AccessAuthGuard } from 'src/apis/auth/guard/auth.guard';
import { RolesGuard } from 'src/apis/auth/guard/roles.guard';
import { ROLE } from 'src/apis/users/entities/user.entity';

export const AuthUserGuard = () => {
  return applyDecorators(
    HasRoles(ROLE.USER), //
    UseGuards(AccessAuthGuard, RolesGuard),
  );
};

export const AuthHostGuard = () => {
  return applyDecorators(
    HasRoles(ROLE.HOST), //
    UseGuards(AccessAuthGuard, RolesGuard),
  );
};

export const AuthAdminGuard = () => {
  return applyDecorators(
    HasRoles(ROLE.ADMIN), //
    UseGuards(AccessAuthGuard, RolesGuard),
  );
};
