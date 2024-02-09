import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { CustomersService } from './customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly customerService: CustomersService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    if (createOrderDto.customerId) {
      const customer = await this.customerService.findOne(
        createOrderDto.customerId,
      );
      order.customer = customer;
    }
    return await this.orderRepo.save(order);
  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (updateOrderDto.customerId) {
      const customer = await this.customerService.findOne(
        updateOrderDto.customerId,
      );
      order.customer = customer;
    }
    await this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }
  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'customer'],
    });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
  }
}
