import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsPositive()
  orderId: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
