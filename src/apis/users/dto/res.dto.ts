import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserResDto extends PickType(User, ['id', 'email', 'nickname', 'point']) {}
export class findProfileResDto extends PickType(User, ['id', 'nickname', 'point']) {}
