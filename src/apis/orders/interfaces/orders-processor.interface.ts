import { Job } from 'bull';
import { IOrdersServiceCreateQueue } from './order-queues-service.interface';

export interface IJob extends Job {
  data: IOrdersServiceCreateQueue;
}
