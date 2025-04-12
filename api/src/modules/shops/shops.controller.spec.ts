import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ShopsController', () => {
  let controller: ShopsController;
  let service: ShopsService;
  let repo: MockType<Repository<Shop>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsController],
      providers: [ShopsService],
    }).compile();

    controller = module.get<ShopsController>(ShopsController);
    service = module.get<ShopsService>(ShopsService);
    repo = module.get(getRepositoryToken(Shop));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
