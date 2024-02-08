import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
