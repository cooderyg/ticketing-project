import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
// private readonly jwtService: JwtService
@Injectable()
export class GatewayAuthGuard implements CanActivate {
  // constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const socket: Socket = context.switchToWs().getClient();
    const temp = socket.handshake.headers.authorization;
    const accessToken = temp.toLowerCase().replace('bearer ', '');
    if (!accessToken) throw new WsException('로그인 후 이용해주세요.');

    try {
      // const payload = this.jwtService.verify(accessToken, { secret: process.env.ACCESS_SECRET_KEY });
      // console.log(payload);
      // socket.data.user = { userId: payload.user.id, role: payload.rols[0] };
      return true;
    } catch (error) {
      throw new WsException(error.message || '로그인 후 이용해주세요.');
    }
  }
}
