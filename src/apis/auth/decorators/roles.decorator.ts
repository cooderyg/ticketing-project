import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/apis/users/entities/user.entity';

export const HasRoles = (...roles: ROLE[]) => SetMetadata('roles', roles);
