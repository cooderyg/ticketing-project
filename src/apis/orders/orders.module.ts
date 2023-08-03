import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ConcertsModule } from '../concerts/concerts.module';
import { UsersModule } from '../users/users.module';
import { SeatsModule } from '../seats/seats.module';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { OrderProcessor } from './orders.processor';
import { OrderQueuesService } from './order-queues.service';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { Queue } from 'bull';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BasicAuthMiddleware } from './middlewares/basic-auth.middleware';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), //
    ConcertsModule,
    UsersModule,
    SeatsModule,
    EventsModule,
    BullModule.registerQueue({
      name: 'orderQueue',
    }),
    BullBoardModule.forFeature({
      name: 'orderQueue',
      adapter: BullAdapter,
    }),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService, //
    OrderQueuesService,
    OrdersRepository,
    OrderProcessor,
  ],
})
export class OrdersModule {
  static register(): DynamicModule {
    const orderQueue = BullModule.registerQueue({
      name: 'orderQueue',
    });

    if (!orderQueue.providers || !orderQueue.exports) {
      throw new Error('Unable to build queue');
    }

    return {
      module: OrdersModule,
      imports: [
        BullModule.forRoot({
          // defaultJobOptions: {
          //   attempts: 3,
          //   backoff: {
          //     type: 'exponential',
          //     delay: 1000,
          //   },
          // },
        }),
        orderQueue,
      ],
      providers: [OrderProcessor, ...orderQueue.providers],
      exports: [...orderQueue.exports],
    };
  }
  constructor(@InjectQueue('orderQueue') private readonly orderQueue: Queue) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: [new BullAdapter(this.orderQueue)],
      serverAdapter,
    });

    consumer.apply(BasicAuthMiddleware, serverAdapter.getRouter()).forRoutes('/queues');
  }
}
