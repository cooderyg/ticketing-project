import { ApiProperty } from '@nestjs/swagger';

interface IUserInfo {
  nickname: string;
  profileImageUrl: string;
  point: number;
}

export class LoginResDto {
  // @ApiProperty({ required: true, example: '로그인을 성공적으로 완료하였습니다.' })
  // message: string;

  @ApiProperty({ required: true, example: 'JWTtoken' })
  accessToken: string;

  @ApiProperty({ required: true, example: 'JWTtoken' })
  refreshToken: string;

  @ApiProperty({
    required: true,
    example: `{ 
                nickname: "홍길동",
                profileImageUrl: "image.png",
                point: 100000
              }`,
  })
  userInfo: IUserInfo;
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
