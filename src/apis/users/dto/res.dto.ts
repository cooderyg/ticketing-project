import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserResDto extends PickType(User, ['id', 'email', 'nickname', 'point']) {}
export class FindProfileResDto extends PickType(User, ['id', 'nickname', 'point']) {}
export class UpdateNicknameResDto extends PickType(User, ['id', 'nickname']) {}
export class UpdateProfileImageResDto extends PickType(User, ['id', 'profileImageUrl']) {}
