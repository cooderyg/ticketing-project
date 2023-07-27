import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, //
  ) {}
  @Post('/login')
  async logIn(
    @Body() loginDto: LoginDto, //
    @Res() res: Response,
  ): Promise<Response> {
    const cookie = await this.authService.login({ loginDto });
    res.setHeader('Set-Cookie', cookie);
    console.log(cookie);
    return res.json({ message: '로그인을 성공적으로 완료하였습니다.' });
  }
}
