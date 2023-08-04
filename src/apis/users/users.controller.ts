import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuthGuard } from '../auth/guard/auth.guard';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserResDto, findProfileResDto } from './dto/res.dto';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';
import { CreateUserDocs, FindProfileDocs } from './decorators/users-controller.decorator';

@ApiExtraModels(CreateUserResDto, findProfileResDto)
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
  ): Promise<findProfileResDto> {
    const userId = user.id;
    return await this.usersService.findProfile({ userId });
  }
}
