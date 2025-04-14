import { Product } from 'src/modules/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class ProductsSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Product);
    await repository.insert([
      {
        description: 'Produto de Teste 1',
        cost: 1,
      },
      {
        description: 'Produto de Teste 2',
        cost: 1.25,
      },
      {
        description: 'Produto de Teste 3',
        cost: 1.5,
      },
    ]);
  }
}
