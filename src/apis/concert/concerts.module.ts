import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { ConcertsService } from './concerts.service';
import { ConcertsRepository } from './concerts.repository';
import { SeatsService } from '../seats/seats.service';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Concert]),
    SeatsModule, //
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService, ConcertsRepository],
  exports: [ConcertsService],
})
export class ConcertsModule {}
