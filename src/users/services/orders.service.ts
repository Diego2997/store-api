import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { UsersService } from './users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private readonly userService: UsersService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    if (createOrderDto.userId) {
      const user = await this.userService.findOne(createOrderDto.userId);
      order.user = user;
    }
    return await this.orderRepo.save(order);
  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (updateOrderDto.userId) {
      const user = await this.userService.findOne(updateOrderDto.userId);
      order.user = user;
    }
    await this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find();
  }
  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
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
