import { DefaultTimestamps } from '../entities/defaultTimestamps.entity';

export interface BaseInterfaceWithIdAndTimeStamps extends DefaultTimestamps {
  id: number;
}
