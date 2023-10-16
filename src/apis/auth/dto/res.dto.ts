import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  // @ApiProperty({ required: true, example: '로그인을 성공적으로 완료하였습니다.' })
  // message: string;

  @ApiProperty({ required: true, example: 'JWTtoken' })
  accessToken: string;

  @ApiProperty({ required: true, example: 'JWTtoken' })
  refreshToken: string;
}

export class RefreshResDto {
  // @ApiProperty({ required: true, example: 'refresh' })
  // message: string;

  @ApiProperty({ required: true, example: 'JWTtoken' })
  accessToken: string;
}

export class LogoutResDto {
  @ApiProperty({ required: true, example: '로그아웃을 성공적으로 완료하였습니다.' })
  message: string;
}
