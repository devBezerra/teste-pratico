import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntityWithIdAndTimestamps {
  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;
}
