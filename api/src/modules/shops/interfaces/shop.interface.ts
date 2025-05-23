import { BaseInterfaceWithIdAndTimeStamps } from 'src/shared/interfaces/baseInterfaceWithIdAndTimestamps.interface';
import { BaseReturnPaginatedRoute } from 'src/shared/interfaces/baseReturnPaginatedRoute.interface';

export interface ShopInterface extends BaseInterfaceWithIdAndTimeStamps {
  description: string;
}

export interface PaginatedRouteShopReturn extends BaseReturnPaginatedRoute {
  content: ShopInterface[];
}
