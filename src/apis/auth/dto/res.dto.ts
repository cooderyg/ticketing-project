import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiProperty({ required: true, example: '로그인을 성공적으로 완료하였습니다.' })
  message: string;
}

export class RefreshResDto {
  @ApiProperty({ required: true, example: 'refresh' })
  message: string;
}

export class LogoutResDto {
  @ApiProperty({ required: true, example: '로그아웃을 성공적으로 완료하였습니다.' })
  message: string;
}