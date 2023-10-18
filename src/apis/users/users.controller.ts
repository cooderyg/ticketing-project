import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuthGuard } from '../auth/guard/auth.guard';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserResDto, FindProfileResDto, UpdateNicknameResDto, UpdateProfileImageResDto } from './dto/res.dto';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';
import { CreateUserDocs, FindProfileDocs, updateNicknameDocs, updateProfileImageDocs } from './decorators/users-controller.decorator';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdateProfileImageDto } from './dto/update-profileImage.dto';
import { MessageResDto } from 'src/commons/dto/message-res.dto';

@ApiExtraModels(CreateUserResDto, FindProfileResDto, UpdateNicknameDto, UpdateNicknameResDto, UpdateProfileImageDto, UpdateProfileImageResDto)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @CreateUserDocs()
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto, //
  ): Promise<CreateUserResDto> {
    const { id, email, nickname, point } = await this.usersService.createUser({ createUserDto });
    return { id, email, nickname, point };
  }

  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ number: number }> {
    const number = await this.usersService.verifyEmail({ verifyEmailDto });

    return { number };
  }

  @FindProfileDocs()
  @UseGuards(AccessAuthGuard)
  @Get('/profile')
  async findProfile(
    @User() user: UserAfterAuth, //
  ): Promise<FindProfileResDto> {
    const userId = user.id;
    return await this.usersService.findProfile({ userId });
  }

  @updateNicknameDocs()
  @UseGuards(AccessAuthGuard)
  @Put('/nickname')
  async updateNickname(@User() user: UserAfterAuth, @Body() updateNicknameDto: UpdateNicknameDto): Promise<UpdateNicknameResDto> {
    const userId = user.id;
    return await this.usersService.updateNickname({ userId, updateNicknameDto });
  }

  @updateProfileImageDocs()
  @UseGuards(AccessAuthGuard)
  @Put('/profileImage')
  async updateProfileImage(@User() user: UserAfterAuth, @Body() updateProfileImageDto: UpdateProfileImageDto): Promise<MessageResDto> {
    const userId = user.id;
    const { profileImageUrl } = updateProfileImageDto;
    await this.usersService.updateProfileImageUrl({ userId, profileImageUrl });

    return { message: '이미지 변경을 성공적으로 완료했습니다.' };
  }
}
