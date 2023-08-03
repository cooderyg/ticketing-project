import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { OrderQueuesService } from './order-queues.service';
import { IJob } from './interfaces/orders-processor.interface';
@Processor('orderQueue')
export class OrderProcessor {
  constructor(
    private readonly orderQueuesService: OrderQueuesService, //
  ) {}
  private readonly logger = new Logger(OrderProcessor.name);

  @Process('addOrderQueue')
  async addOrderQueue(job: IJob): Promise<void> {
    this.logger.debug('대기열 큐가 실행되었습니다.');
    const { concertId, userId, amount, seatIds, uuid } = job.data;
    try {
      await this.orderQueuesService.create({ concertId, userId, amount, seatIds, uuid });
      return;
    } catch (error) {
      return;
    }
  }

  // queue 작업실패 시 따로 작업할 수 있는 곳
  // @OnQueueFailed()
  // onFailed(job: IJob, error) {
  //   this.logger.error(`Order processing failed: ${error.message}`);
  //   // 여기서 오류를 기록하거나 다른 처리를 수행
  //   throw new HttpException(error.message, error.status);
  // }
}
// 슬랙, 그라파나, 카프카,aws키바나 대기하고 유저한테 반환하는 것은 불가능
// 애초에 부하를 줄이기 위해 큐를 사용했는데 대기를 하고 있는 것 자체가 이상 함 큐를 이상하게 사용중
