import { ProductShop } from 'src/modules/product-shop/entities/product-shop.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class ProductShopSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(ProductShop);
    await repository.insert([
      {
        productId: 1,
        shopId: 1,
        price: 2.25,
      },
      {
        productId: 1,
        shopId: 2,
        price: 5.25,
      },
      {
        productId: 2,
        shopId: 1,
        price: 10,
      },
    ]);
  }
}
