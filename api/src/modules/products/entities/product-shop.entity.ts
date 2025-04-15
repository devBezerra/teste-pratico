import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'products_shop' })
export class ProductShop extends BaseEntityWithIdAndTimestamps {
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'shop_id' })
  shopId: number;
}
