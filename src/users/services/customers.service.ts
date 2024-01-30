import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dtos';

import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}
  findAll() {
    return this.customerRepo.find();
  }
  findOne(id: number) {
    const customer = this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
  async create(data: CreateCustomerDto) {
    try {
      const newCustomer = this.customerRepo.create(data);
      await this.customerRepo.save(newCustomer);
      return newCustomer;
    } catch (error) {
      console.log(error);
    }
  }
  async update(id: number, changes: UpdateCustomerDto) {
    try {
      const customer = await this.findOne(id);
      this.customerRepo.merge(customer, changes);
      await this.customerRepo.save(customer);
    } catch (error) {
      console.log(error);
    }
  }
  async remove(id: number) {
    const customer = await this.findOne(id);
    await this.customerRepo.remove(customer);
  }
}
