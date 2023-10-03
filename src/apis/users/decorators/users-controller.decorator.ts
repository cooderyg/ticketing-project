import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiGetResponse, ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { CreateUserResDto, FindProfileResDto, UpdateNicknameResDto } from '../dto/res.dto';

export const CreateUserDocs = () => {
  return applyDecorators(
    ApiPostResponse(CreateUserResDto), //
    ApiResponse({ status: 409, description: '이미 등록된 이메일입니다.' }),
  );
};

export const FindProfileDocs = () => {
  return applyDecorators(
    ApiGetResponse(FindProfileResDto), //
    ApiResponse({ status: 404, description: '해당 유저를 찾을 수 없습니다.' }),
    ApiBearerAuth(),
  );
};

export const updateNicknameDocs = () => {
  return applyDecorators(
    ApiGetResponse(UpdateNicknameResDto), //
    ApiResponse({ status: 404, description: '해당 유저를 찾을 수 없습니다.' }),
    ApiBearerAuth(),
  );
};
