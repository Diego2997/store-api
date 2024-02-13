import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';

import { User } from '../entities/user.entity';
import { ProductsService } from 'src/products/services/products.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly productService: ProductsService,
    private readonly customerService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    const user = this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(data);
      if (data.customerId) {
        const customer = await this.customerService.findOne(data.customerId);
        newUser.customer = customer;
      }
      const salt = 10;
      const hashPassword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashPassword;
      await this.userRepo.save(newUser);
      return newUser;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      this.userRepo.merge(user, changes);
      await this.userRepo.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  async getOrderByUserId(id: number) {
    // const user = this.findOne(id);
    // return {
    //   date: new Date(),
    //   user,
    //   products: await this.productService.findAll(),
    // };
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  errorHandler(error: any) {
    const errorCode = error.code;
    if (error.code === errorCode) {
      throw new BadRequestException(`${error.detail}`);
    }
    throw new InternalServerErrorException('Error, Check server logs');
  }
}
