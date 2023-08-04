import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiGetResponse, ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { CreateUserResDto, findProfileResDto } from '../dto/res.dto';

export const CreateUserDocs = () => {
  return applyDecorators(
    ApiPostResponse(CreateUserResDto), //
    ApiResponse({ status: 409, description: '이미 등록된 이메일입니다.' }),
  );
};

export const FindProfileDocs = () => {
  return applyDecorators(
    ApiGetResponse(findProfileResDto), //
    ApiResponse({ status: 404, description: '해당 유저를 찾을 수 없습니다.' }),
    ApiBearerAuth(),
  );
};
