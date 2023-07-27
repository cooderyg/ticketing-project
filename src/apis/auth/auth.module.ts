import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtAccessStrategy, AuthService],
})
export class AuthModule {}
