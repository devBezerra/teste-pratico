import { BaseInterfaceWithIdAndTimeStamps } from 'src/shared/interfaces/baseInterfaceWithIdAndTimestamps.interface';

export interface ProductShopInterface extends BaseInterfaceWithIdAndTimeStamps {
  price: number;
  shopId: number;
  productId: number;
}
