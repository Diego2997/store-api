import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  imports: [ProductsModule],
})
export class UsersModule {}
