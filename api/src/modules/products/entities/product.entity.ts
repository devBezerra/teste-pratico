import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductShop } from './product-shop.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntityWithIdAndTimestamps {
  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @OneToMany(() => ProductShop, (productShop) => productShop.shop, {
    cascade: true,
  })
  productsShop?: ProductShop[];
}
