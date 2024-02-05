import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
