import { Product } from 'src/products/entities/product.entity';
import { User } from './user.entity';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  user: User;
  products: Product[];
}
