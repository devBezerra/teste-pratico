import { Test, TestingModule } from '@nestjs/testing';
import { ProductShopController } from './product-shop.controller';
import { ProductShopService } from './product-shop.service';

describe('ProductShopController', () => {
  let controller: ProductShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductShopController],
      providers: [ProductShopService],
    }).compile();

    controller = module.get<ProductShopController>(ProductShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
