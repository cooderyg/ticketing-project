import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service';
import { SeatsRepository } from './seats.repository';
import { SeatsContoller } from './seats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsContoller],
  providers: [SeatsService, SeatsRepository],
  exports: [SeatsService],
})
export class SeatsModule {}
