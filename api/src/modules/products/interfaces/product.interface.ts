import { BaseInterfaceWithIdAndTimeStamps } from 'src/shared/interfaces/baseInterfaceWithIdAndTimestamps.interface';
import { BaseReturnPaginatedRoute } from 'src/shared/interfaces/baseReturnPaginatedRoute.interface';

export interface ProductInterface extends BaseInterfaceWithIdAndTimeStamps {
  description: string;
  cost: number;
}

export interface PaginatedRouteProductReturn extends BaseReturnPaginatedRoute {
  content: ProductInterface[];
}
