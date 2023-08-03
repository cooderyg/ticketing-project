import { applyDecorators } from '@nestjs/common';

import { CreateConcertResDto } from '../dto/res.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiPostResponse, ApiPutResponse } from 'src/commons/decorators/swagger.decorator';

export const CreateConcertDocs = () => {
  return applyDecorators(
    ApiBearerAuth(), //
    ApiPostResponse(CreateConcertResDto),
  );
};

export const UpdateConcertDocs = () => {
  return applyDecorators(
    ApiBearerAuth(), //
    ApiPutResponse(CreateConcertResDto),
  );
};
