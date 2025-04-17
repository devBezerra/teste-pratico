import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './main-seeder';
import { Shop } from 'src/modules/shops/entities/shop.entity';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductShop } from 'src/modules/product-shop/entities/product-shop.entity';

config();

const configService = new ConfigService();

export const typeormOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT')!,
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: false,
  entities: [Shop, Product, ProductShop],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(typeormOptions);
