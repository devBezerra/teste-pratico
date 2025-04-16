import { ProductShop } from 'src/modules/product-shop/entities/product-shop.entity';
import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'shops' })
export class Shop extends BaseEntityWithIdAndTimestamps {
  @Column()
  description: string;

  @OneToMany(() => ProductShop, (productShop) => productShop.shop, {
    cascade: true,
  })
  productsShop?: ProductShop[];
}
