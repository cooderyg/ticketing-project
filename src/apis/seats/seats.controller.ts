import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsContoller {
  constructor(
    private readonly seatsService: SeatsService, //
  ) {}

  @Get('/:concertId')
  getall(@Param('concertId') concertId: string) {
    this.seatsService.findSeatsByConcertId({ concertId });
  }
}
