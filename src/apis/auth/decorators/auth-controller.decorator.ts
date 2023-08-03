import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { LoginResDto } from '../dto/res.dto';

export const LogInDocs = () => {
  return applyDecorators(
    ApiPostResponse(LoginResDto),
    ApiResponse({ status: 404, description: '해당하는 email에 일치하는 유저가 없습니다.' }),
    ApiResponse({ status: 401, description: '비밀번호가 일치하지 않습니다.' }),
  );
};
