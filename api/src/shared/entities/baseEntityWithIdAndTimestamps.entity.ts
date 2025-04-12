import { PrimaryGeneratedColumn } from 'typeorm';
import { DefaultTimestamps } from './defaultTimestamps.entity';

export abstract class BaseEntityWithIdAndTimestamps extends DefaultTimestamps {
  @PrimaryGeneratedColumn()
  id: number;
}
