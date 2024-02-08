import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
