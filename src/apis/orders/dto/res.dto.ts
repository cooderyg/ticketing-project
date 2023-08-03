import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

export class CreateOrderResDto extends OmitType(Order, ['concert', 'user', 'updatedAt']) {}

export class CreateQueueResDto {
  @ApiProperty({ example: 'uuid', description: '큐 jobId' })
  jobId: string;
}

export class OrderCancelResDto extends PickType(Order, ['id', 'status', 'updatedAt']) {}

export class FindByUserIdResDto extends CreateOrderResDto {
  @ApiProperty({ example: 'concert: { name: "싸이의 흠뻑쑈", concertDate: "2023-08-10" }', description: '공연 이름, 공연 날짜' })
  concert: {
    name: string;
    concertDate: Date;
  };
}
