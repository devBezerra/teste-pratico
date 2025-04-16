import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Shop } from 'src/modules/shops/entities/shop.entity';

@Entity({ name: 'products_shop' })
export class ProductShop extends BaseEntityWithIdAndTimestamps {
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'shop_id' })
  shopId: number;

  @ManyToOne(() => Product, (product) => product.productsShop)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Shop, (shop) => shop.productsShop)
  @JoinColumn({ name: 'shop_id' })
  shop?: Shop;
}
