import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AccessAuthGuard } from '../auth/guard/auth-guard';
import { IRequest } from 'src/commons/interfaces/context';
import { CreateOrderDto } from './dto/create-order.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HasRoles } from '../auth/guard/roles.decorator';
import { ROLE } from '../users/entities/user.entity';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService, //
  ) {}

  @HasRoles(ROLE.USER)
  @UseGuards(AccessAuthGuard, RolesGuard)
  @Post()
  create(
    @Req() req: IRequest,
    @Body() createOrderDto: CreateOrderDto, //
  ): Promise<Order> {
    const userId = req.user.id;
    const { amount, concertId, seatIds } = createOrderDto;
    return this.ordersService.create({ amount, concertId, seatIds, userId });
  }

  @HasRoles(ROLE.USER)
  @UseGuards(AccessAuthGuard, RolesGuard)
  @Post('/queue')
  createQueue(
    @Req() req: IRequest,
    @Body() createOrderDto: CreateOrderDto, //
  ) {
    const userId = req.user.id;
    const { amount, concertId, seatIds } = createOrderDto;
    return this.ordersService.addorderQueue({ amount, concertId, seatIds, userId });
  }

  @HasRoles(ROLE.USER)
  @UseGuards(AccessAuthGuard, RolesGuard)
  @Post('/cancel/:orderId')
  orderCancel(
    @Param('orderId') orderId: string, //
    @Req() req: IRequest,
  ): Promise<Order> {
    console.log(orderId);
    const userId = req.user.id;
    return this.ordersService.orderCancel({ orderId, userId });
  }

  @HasRoles(ROLE.USER)
  @UseGuards(AccessAuthGuard, RolesGuard)
  @Get()
  findByUserId(
    @Req() req: IRequest, //
    @Query('page') page: string,
  ): Promise<Order[]> {
    const userId = req.user.id;
    return this.ordersService.findByUserId({ userId, page: +page });
  }
}
