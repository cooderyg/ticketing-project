import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ApiGetItemsResponse, ApiPostResponse } from 'src/commons/decorators/swagger.decorator';
import { CreateOrderResDto, CreateQueueResDto, FindByUserIdResDto, CancelOrderResDto } from '../dto/res.dto';

export const CreateOrderDocs = () => {
  return applyDecorators(
    ApiPostResponse(CreateOrderResDto),
    ApiResponse({ status: 404, description: '해당 콘서트를 찾을 수 없습니다.' }),
    ApiResponse({ status: 400, description: '포인트 잔액이 부족합니다.' }),
    ApiResponse({ status: 409, description: '이미 판매된 좌석입니다.' }),
    ApiBearerAuth(),
  );
};

export const CreateQueueOrderDocs = () => {
  return applyDecorators(
    ApiPostResponse(CreateQueueResDto),
    ApiResponse({ status: 404, description: '해당 콘서트를 찾을 수 없습니다.' }),
    ApiResponse({ status: 400, description: '포인트 잔액이 부족합니다.' }),
    ApiResponse({ status: 409, description: '이미 판매된 좌석입니다.' }),
    ApiBearerAuth(),
  );
};

export const CancelOrderDocs = () => {
  return applyDecorators(
    ApiPostResponse(CancelOrderResDto),
    ApiResponse({ status: 401, description: '주문취소 권한이 없습니다.' }),
    ApiResponse({ status: 409, description: '이미 취소된 결제입니다.' }),
    ApiResponse({ status: 409, description: '이미 취소된 주문입니다.' }),
    ApiResponse({ status: 409, description: '취소가능 시간을 초과하였습니다.' }),
    ApiBearerAuth(),
  );
};

export const FindByUserIdDocs = () => {
  return applyDecorators(
    ApiGetItemsResponse(FindByUserIdResDto), //
    ApiBearerAuth(),
  );
};
