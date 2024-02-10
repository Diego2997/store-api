import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
