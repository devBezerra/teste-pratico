import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';

export interface ShopInterface extends BaseEntityWithIdAndTimestamps {
  description: string;
}

export interface PaginatedRouteShopReturn {
  content: ShopInterface[];
  total: number;
}
