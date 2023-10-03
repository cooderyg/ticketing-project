import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuthGuard } from '../auth/guard/auth.guard';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserResDto, FindProfileResDto, UpdateNicknameResDto } from './dto/res.dto';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';
import { CreateUserDocs, FindProfileDocs, updateNicknameDocs } from './decorators/users-controller.decorator';
import { UpdateNicknameDto } from './dto/update-nickname.dto';

@ApiExtraModels(CreateUserResDto, FindProfileResDto, UpdateNicknameResDto)
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
}
