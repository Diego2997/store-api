import { BaseEntity } from 'src/common/entity/base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Brand extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 254 })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
