import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { ShopIdExistPipe } from './pipes/shop-id-exist.pipe';
import { ShopDescriptionAlreadyExist } from './validate/shop-description-already-exist.constraint';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createShopDtoMock,
  shopMock,
  shopMock2,
  shopsMock,
  updateShopDtoMock,
} from 'src/shared/mocks/shop.mock';
import { id, MockType } from 'src/shared/mocks/global.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ShopsService', () => {
  let service: ShopsService;
  let repo: MockType<Repository<Shop>>;

  const mockRepository = {
    getAll: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopsService,
        ShopIdExistPipe,
        ShopDescriptionAlreadyExist,
        {
          provide: getRepositoryToken(Shop),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
    repo = module.get(getRepositoryToken(Shop));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of shops', async () => {
    mockRepository.find.mockResolvedValue(shopsMock);
    expect(await service.findAll()).toBe(shopsMock);
  });

  it('should return an shop', async () => {
    mockRepository.findOneOrFail.mockResolvedValue(shopMock);
    expect(await service.findOne(id)).toBe(shopMock);
  });

  it('submitted should be true when create shop', async () => {
    const expectedReturn = {
      shop: shopMock,
      message: 'A loja foi criada com sucesso.',
    };
    mockRepository.save.mockResolvedValue(shopMock);
    await expect(service.create(createShopDtoMock)).resolves.toEqual(
      expectedReturn,
    );
  });

  it('submitted should be true when update shop', async () => {
    const expectedReturn = {
      shop: shopMock,
      message: 'A loja foi atualizada com sucesso.',
    };
    mockRepository.findOneOrFail.mockResolvedValue(shopMock);
    mockRepository.save.mockResolvedValue(updateShopDtoMock);
    mockRepository.findOne.mockResolvedValue(shopMock);
    await expect(service.update(id, updateShopDtoMock)).resolves.toEqual(
      expectedReturn,
    );
  });

  it('submitted should be true when delete shop', async () => {
    const expectedReturn = { message: 'A loja foi removida com sucesso.' };
    mockRepository.findOneOrFail.mockResolvedValue(shopMock);
    mockRepository.softDelete.mockResolvedValue(shopMock);
    await expect(service.remove(id)).resolves.toEqual(expectedReturn);
  });

  it('should return error of shops', async () => {
    const expectedReturn = { message: 'Não foi possível encontrar as lojas.' };
    mockRepository.find.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(service.findAll()).rejects.toThrow(expectedReturn.message);
  });

  it('should return an error in find one shop', async () => {
    const expectedReturn = { message: 'Não foi possível encontrar a loja.' };
    mockRepository.findOneOrFail.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(service.findOne(id)).rejects.toThrow(expectedReturn.message);
  });

  it('should return an error when find by description', async () => {
    const expectedReturn = { message: 'Não foi possível encontrar a loja.' };
    mockRepository.findOne.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(
      service.findByDescription(shopMock.description, shopMock2),
    ).rejects.toThrow(expectedReturn.message);
  });

  it('submitted should be error when create shop', async () => {
    const expectedReturn = { message: 'Não foi possível criar a loja.' };
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.create(createShopDtoMock)).rejects.toThrow(
      expectedReturn.message,
    );
  });

  it('submitted should be error when update shop', async () => {
    const expectedReturn = { message: 'Não foi possível atualizar a loja.' };
    mockRepository.findOneOrFail.mockResolvedValue(shopMock);
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.update(id, updateShopDtoMock)).rejects.toThrow(
      expectedReturn.message,
    );
  });

  it('should return an error message of delete shop', async () => {
    const expectedReturn = { message: 'Não foi possível excluir a loja.' };
    mockRepository.softDelete.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.remove(id)).rejects.toThrow(expectedReturn.message);
  });
});
