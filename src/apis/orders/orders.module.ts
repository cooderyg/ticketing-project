import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ConcertsModule } from '../concerts/concerts.module';
import { UsersModule } from '../users/users.module';
import { SeatsModule } from '../seats/seats.module';
import { BullModule } from '@nestjs/bull';
import { OrderProcessor } from './orders.processor';
import { OrderQueuesService } from './order-queues.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), //
    ConcertsModule,
    UsersModule,
    SeatsModule,
    BullModule.registerQueue({
      name: 'orderQueue',
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderQueuesService, OrdersRepository, OrderProcessor],
})
export class OrdersModule {}
