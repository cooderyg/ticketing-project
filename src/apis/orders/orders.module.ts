import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderSeat } from './entities/order-seat.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Seat } from '../seats/entities/seat.entity';
import { User } from '../users/entities/user.entity';
import { ConcertsModule } from '../concert/concerts.module';
import { UsersModule } from '../users/users.module';
import { SeatsModule } from '../seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderSeat]), //
    ConcertsModule,
    UsersModule,
    SeatsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
