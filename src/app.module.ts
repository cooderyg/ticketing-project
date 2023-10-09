import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsModule } from './apis/seats/seats.module';
import { CategoriesModule } from './apis/categories/categories.module';
import { ConcertsModule } from './apis/concerts/concerts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/users/users.module';
import { OrdersModule } from './apis/orders/orders.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { LoggerMiddleware } from './commons/middlewares/logger.middleware';
import { EventsModule } from './apis/events/events.module';
import { UploadsModule } from './apis/uploads/uploads.module';
import { MailModule } from './apis/mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    ConcertsModule,
    EventsModule,
    MailModule,
    SeatsModule,
    OrdersModule,
    UploadsModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'my-redis',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      preview: false,
    }),
  ],
  controllers: [
    AppController, //
  ],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
