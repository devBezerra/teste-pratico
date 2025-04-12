import { BaseEntityWithIdAndTimestamps } from 'src/shared/entities/baseEntityWithIdAndTimestamps.entity';

export interface ShopInterface extends BaseEntityWithIdAndTimestamps {
  description: string;
}
