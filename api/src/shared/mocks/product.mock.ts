import { ProductInterface } from 'src/modules/products/interfaces/product.interface';
import { id } from './global.mock';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';

export const productMock: ProductInterface = {
  id,
  description: 'Produto Mock Teste',
  cost: 1,
};

export const productMock2: ProductInterface = {
  id: 2,
  description: 'Produto Mock Teste 2',
  cost: 1.5,
};

export const productsMock: ProductInterface[] = [productMock, productMock2];

export const createProductDtoMock: CreateProductDto = {
  description: 'Produto Mock Teste Criação',
  cost: '2.5',
};

export const updateProductDtoMock: UpdateProductDto = {
  id,
  description: 'Produto Mock Teste Criação',
};
