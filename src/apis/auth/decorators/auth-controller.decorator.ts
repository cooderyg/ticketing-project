import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { LoginResDto, LogoutResDto, RefreshResDto } from '../dto/res.dto';

export const LogInDocs = () => {
  return applyDecorators(
    ApiPostResponse(LoginResDto),
    ApiResponse({ status: 404, description: '해당하는 email에 일치하는 유저가 없습니다.' }),
    ApiResponse({ status: 401, description: '비밀번호가 일치하지 않습니다.' }),
  );
};

export const LogoutDocs = () => {
  return applyDecorators(
    ApiPostResponse(LogoutResDto), //
    ApiResponse({ status: 400, description: '잘못된 요청입니다.' }),
    ApiBearerAuth(),
  );
};

export const RefreshDocs = () => {
  return applyDecorators(
    ApiPostResponse(RefreshResDto), //
    ApiResponse({ status: 400, description: '잘못된 요청입니다.' }),
  );
};
