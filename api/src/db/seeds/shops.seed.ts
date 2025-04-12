import { Shop } from 'src/modules/shops/entities/shop.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class ShopsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Shop);
    await repository.insert([
      {
        description: 'Loja de Teste 1',
      },
      {
        description: 'Loja de Teste 2',
      },
    ]);
  }
}

