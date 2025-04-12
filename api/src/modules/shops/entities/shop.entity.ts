import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'shops' })
export class Shop extends BaseEntityWithIdAndTimestamps {
  @Column()
  description: string;
}
