import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
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
