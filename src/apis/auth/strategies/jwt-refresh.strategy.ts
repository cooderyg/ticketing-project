import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; //refreshToken=pvgkmjsklfmsk
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_SECRET_KEY,
    });
  }
  validate(payload) {
    if (payload['tokenType'] !== 'refresh') throw new UnauthorizedException();
    console.log(payload); // { sub: kjvgndfgvkj(유저ID) }
    return {
      id: payload.sub, // req.user = {id : ---}
    };
  }
}
