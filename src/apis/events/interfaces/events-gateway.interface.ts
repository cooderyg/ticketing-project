import { HttpException } from '@nestjs/common';
import { Order } from 'src/apis/orders/entities/order.entity';

export interface IEventsGatewayOrderEnd {
  jobId: string;
  success: boolean;
  order?: Order;
  error?: HttpException;
}

export interface IEventsGatewayOrderStartData {
  jobId: string;
}
