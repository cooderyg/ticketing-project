import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueuesService } from './order-queues.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { User, UserAfterAuth } from 'src/commons/decorators/user.decoreator';
import { AuthUserGuard } from 'src/commons/decorators/coustom-guards.decorator';
import { PageReqDto } from 'src/commons/dto/page-req.dto';
import { CreateOrderResDto, CreateQueueResDto, FindByUserIdResDto, CancelOrderResDto } from './dto/res.dto';
import { CreateOrderDocs, CreateQueueOrderDocs, FindByUserIdDocs, CancelOrderDocs } from './decorators/orders-controller.decorator';

@ApiTags('orders')
@ApiExtraModels(CreateOrderDto, CreateOrderResDto, FindByUserIdResDto, CancelOrderResDto, CreateQueueResDto)
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService, //
    private readonly orderQueuesService: OrderQueuesService,
  ) {}

  @CreateOrderDocs()
  @AuthUserGuard()
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto, //
    @User() user: UserAfterAuth,
  ): Promise<CreateOrderResDto> {
    const userId = user.id;
    const { amount, concertId, seatIds } = createOrderDto;
    const { amount: _amount, createdAt, id, seatInfos, status } = await this.ordersService.createOrder({ amount, concertId, seatIds, userId });
    return { id, amount: _amount, seatInfos, status, createdAt };
  }

  @CreateQueueOrderDocs()
  @AuthUserGuard()
  @Post('/queue')
  async createQueue(
    @Body() createOrderDto: CreateOrderDto, //
    @User() user: UserAfterAuth,
  ): Promise<CreateQueueResDto> {
    const userId = user.id;
    const { amount, concertId, seatIds } = createOrderDto;
    const jobId = await this.orderQueuesService.addorderQueue({ amount, concertId, seatIds, userId });

    return { jobId };
  }

  @CancelOrderDocs()
  @AuthUserGuard()
  @Post('/cancel/:orderId')
  cancelOrder(
    @Param('orderId') orderId: string, //
    @User() user: UserAfterAuth,
  ): Promise<CancelOrderResDto> {
    console.log(orderId);
    const userId = user.id;
    return this.ordersService.cancelOrder({ orderId, userId });
  }

  @FindByUserIdDocs()
  @AuthUserGuard()
  @Get()
  findByUserId(
    @Query() { page, size }: PageReqDto, //
    @User() user: UserAfterAuth,
  ): Promise<FindByUserIdResDto[]> {
    const userId = user.id;
    return this.ordersService.findByUserId({ userId, page, size });
  }
}
