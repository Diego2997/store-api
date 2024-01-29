import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  lastname: string;
  @Column({ type: 'varchar', length: 100 })
  phone: string;
}
