import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { ShopsSeed } from './seeds/shops.seed';
import { ProductsSeed } from './seeds/products.seed';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ShopsSeed, ProductsSeed],
    });
  }
}
