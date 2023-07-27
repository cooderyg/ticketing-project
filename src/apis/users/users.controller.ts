import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuthGuard } from '../auth/guard/auth-guard';
import { IRequest } from 'src/commons/interfaces/context';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto, //
  ): Promise<User> {
    return this.usersService.createUser({ createUserDto });
  }

  @UseGuards(AccessAuthGuard)
  @Get('/profile')
  findProfile(@Req() req: IRequest): Promise<User> {
    const userId = req.user.id;
    return this.usersService.findProfile({ userId });
  }
}
