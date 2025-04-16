import { Test, TestingModule } from '@nestjs/testing';
import { ProductShopService } from './product-shop.service';

describe('ProductShopService', () => {
  let service: ProductShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductShopService],
    }).compile();

    service = module.get<ProductShopService>(ProductShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
