import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 150, unique: true })
  name: string;
}
