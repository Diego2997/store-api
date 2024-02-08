import { BaseEntity } from 'src/common/entity/base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product) //relacion unidireccional
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
