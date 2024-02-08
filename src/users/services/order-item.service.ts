import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/services/products.service';
import { OrdersService } from './orders.service';
import { CreateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    private readonly productService: ProductsService,
    private readonly orderService: OrdersService,
  ) {}

  async create(orderItem: CreateOrderItemDto) {
    const product = await this.productService.findOne(orderItem.productId);
    const order = await this.orderService.findOne(orderItem.orderId);
    // const item = this.itemRepo.create(orderItem);
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = orderItem.quantity;
    console.log(item);
    await this.itemRepo.save(item);
  }
}
