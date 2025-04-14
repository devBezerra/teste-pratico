import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { id, MockType } from 'src/shared/mocks/global.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductIdExistPipe } from './pipes/product-id-exist.pipe';
import { ProductDescriptionAlreadyExist } from './validate/product-description-already-exist.constraint';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createProductDtoMock,
  productMock,
  productMock2,
  updateProductDtoMock,
} from 'src/shared/mocks/product.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: MockType<Repository<Product>>;

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
        ProductsService,
        ProductIdExistPipe,
        ProductDescriptionAlreadyExist,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products', async () => {
    mockRepository.find.mockResolvedValue(productMock);
    expect(await service.findAll()).toBe(productMock);
  });

  it('should return an product', async () => {
    mockRepository.findOneOrFail.mockResolvedValue(productMock);
    expect(await service.findOne(id)).toBe(productMock);
  });

  it('submitted should be true when create product', async () => {
    const expectedReturn = {
      product: productMock,
      message: 'O produto foi criado com sucesso.',
    };
    mockRepository.save.mockResolvedValue(productMock);
    await expect(service.create(createProductDtoMock)).resolves.toEqual(
      expectedReturn,
    );
  });

  it('submitted should be true when update product', async () => {
    const expectedReturn = {
      product: productMock,
      message: 'O produto foi atualizado com sucesso.',
    };
    mockRepository.findOneOrFail.mockResolvedValue(productMock);
    mockRepository.save.mockResolvedValue(updateProductDtoMock);
    mockRepository.findOne.mockResolvedValue(productMock);
    await expect(service.update(id, updateProductDtoMock)).resolves.toEqual(
      expectedReturn,
    );
  });

  it('submitted should be true when delete product', async () => {
    const expectedReturn = { message: 'O produto foi removido com sucesso.' };
    mockRepository.findOneOrFail.mockResolvedValue(productMock);
    mockRepository.softDelete.mockResolvedValue(productMock);
    await expect(service.remove(id)).resolves.toEqual(expectedReturn);
  });

  it('should return error of products', async () => {
    const expectedReturn = {
      message: 'Não foi possível encontrar os produtos.',
    };
    mockRepository.find.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(service.findAll()).rejects.toThrow(expectedReturn.message);
  });

  it('should return an error in find one product', async () => {
    const expectedReturn = { message: 'Não foi possível encontrar o produto.' };
    mockRepository.findOneOrFail.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(service.findOne(id)).rejects.toThrow(expectedReturn.message);
  });

  it('should return an error when find by description', async () => {
    const expectedReturn = { message: 'Não foi possível encontrar o produto.' };
    mockRepository.findOne.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.NOT_FOUND),
    );
    await expect(
      service.findByDescription(productMock.description, productMock2),
    ).rejects.toThrow(expectedReturn.message);
  });

  it('submitted should be error when create product', async () => {
    const expectedReturn = { message: 'Não foi possível criar o produto.' };
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.create(createProductDtoMock)).rejects.toThrow(
      expectedReturn.message,
    );
  });

  it('submitted should be error when update product', async () => {
    const expectedReturn = { message: 'Não foi possível atualizar o produto.' };
    mockRepository.findOneOrFail.mockResolvedValue(productMock);
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.update(id, updateProductDtoMock)).rejects.toThrow(
      expectedReturn.message,
    );
  });

  it('should return an error message of delete product', async () => {
    const expectedReturn = { message: 'Não foi possível excluir o produto.' };
    mockRepository.softDelete.mockRejectedValue(
      new HttpException(expectedReturn, HttpStatus.BAD_REQUEST),
    );
    await expect(service.remove(id)).rejects.toThrow(expectedReturn.message);
  });
});
