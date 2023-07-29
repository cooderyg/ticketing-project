import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { IOrdersServiceCreate, OrdersService } from './orders.service';
import { HttpException, Logger } from '@nestjs/common';

@Processor('orderQueue')
export class OrderProcessor {
  constructor(
    private readonly ordersService: OrdersService, //
  ) {}
  private readonly logger = new Logger(OrderProcessor.name);

  @Process('addOrderQueue')
  async addOrderQueue(job: IJob) {
    this.logger.debug('qqqq');
    const { concertId, userId, amount, seatIds } = job.data;
    try {
      const order = await this.ordersService.create({ concertId, userId, amount, seatIds });
      return order;
    } catch (error) {
      throw new HttpException(error.message, error.status ? error.status : 500);
    }
  }

  @OnQueueFailed()
  onFailed(job: Job<any>, error) {
    this.logger.error(`Order processing failed: ${error.message}`);
    // 여기서 오류를 기록하거나 다른 처리를 수행
    throw new HttpException(error.message, error.status);
  }
}

interface IJob extends Job {
  data: IOrdersServiceCreate;
}
