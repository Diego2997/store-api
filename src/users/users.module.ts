import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer, Order])],
})
export class UsersModule {}
