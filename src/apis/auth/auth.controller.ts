import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LoginResDto, LogoutResDto, RefreshResDto } from './dto/res.dto';
import { LogInDocs, LogoutDocs, RefreshDocs } from './decorators/auth-controller.decorator';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';
import { AccessAuthGuard, RefreshAuthGuard } from './guard/auth.guard';
import { IRequest } from 'src/commons/interfaces/context';
import { RefreshDto } from './dto/refresh.dto';

@ApiExtraModels(LoginResDto, RefreshResDto, LogoutResDto)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}

  @LogInDocs()
  @Post('/login')
  async logIn(
    @Body() loginDto: LoginDto, //
    // @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResDto> {
    const { accessToken, refreshToken, user } = await this.authService.login({ loginDto });
    // res.cookie('refreshToken', refreshToken);
    // // , { httpOnly: true, secure: true }
    // res.setHeader('Authorization', `Bearer ${accessToken}`);

    const userInfo = {
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
      point: user.point,
      role: user.role,
    };

    return { accessToken, refreshToken, userInfo };
  }

  @LogoutDocs()
  @UseGuards(AccessAuthGuard)
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserAfterAuth, //
  ): Promise<LogoutResDto> {
    this.authService.logout({ userId: user.id });
    res.cookie('refreshToken', '');
    // , { httpOnly: true, secure: true }
    return { message: '로그아웃을 성공적으로 완료하였습니다.' };
  }

  @RefreshDocs()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(
    @Req() req: IRequest, //
    // @Res({ passthrough: true }) res: Response,
    @Body() refreshDto: RefreshDto,
    @User() user: UserAfterAuth,
  ): Promise<RefreshResDto> {
    // const token = req.cookies['refreshToken'];

    const { refreshToken: token } = refreshDto;

    return await this.authService.refresh({ token, user });
    // res.setHeader('Authorization', `Bearer ${accessToken}`);
  }
}
