import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Seat } from './entities/seat.entity';

@Controller('seats')
export class SeatsContoller {
  constructor(
    private readonly seatsService: SeatsService, //
  ) {}

  @Get('/:concertId')
  getall(@Param('concertId') concertId: string): Promise<Seat[]> {
    return this.seatsService.findSeatsByConcertId({ concertId });
  }
}
