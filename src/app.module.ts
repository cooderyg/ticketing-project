import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatsModule } from './apis/seats/seats.module';
import { CategoriesModule } from './apis/categories/categories.module';
import { ConcertsModule } from './apis/concert/concerts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/users/users.module';
import { OrdersModule } from './apis/orders/orders.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    ConcertsModule,
    SeatsModule,
    OrdersModule,
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
  ],
  controllers: [
    AppController, //
  ],
  providers: [AppService],
})
export class AppModule {}
