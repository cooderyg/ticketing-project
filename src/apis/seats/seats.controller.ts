import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiGetItemsResponse } from 'src/commons/decorators/swagger.decorator';
import { SeatGetAllResDto } from './dto/res.dto';

@ApiExtraModels(SeatGetAllResDto)
@ApiTags('seats')
@Controller('seats')
export class SeatsContoller {
  constructor(
    private readonly seatsService: SeatsService, //
  ) {}

  @ApiGetItemsResponse(SeatGetAllResDto)
  @Get('/:concertId')
  async getall(@Param('concertId') concertId: string): Promise<SeatGetAllResDto[]> {
    const seats = await this.seatsService.findSeatsByConcertId({ concertId });
    return seats;
  }
}
