import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @Post()
  find(@Body() createOrderItem: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItem);
  }
}
