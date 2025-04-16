import { ProductShop } from 'src/modules/product-shop/entities/product-shop.entity';
import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends BaseEntityWithIdAndTimestamps {
  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @OneToMany(() => ProductShop, (productShop) => productShop.product, {
    cascade: true,
  })
  productsShop?: ProductShop[];
}
