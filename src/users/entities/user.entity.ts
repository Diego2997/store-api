import { BaseEntity } from 'src/common/entity/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from './order.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'bool', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
