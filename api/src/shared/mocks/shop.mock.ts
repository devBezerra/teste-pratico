import { ShopInterface } from 'src/modules/shops/interfaces/shop.interface';
import { id } from './global.mock';
import { CreateShopDto } from 'src/modules/shops/dto/create-shop.dto';
import { UpdateShopDto } from 'src/modules/shops/dto/update-shop.dto';

export const shopMock: ShopInterface = {
  id,
  description: 'Loja Mock Teste',
};

export const shopMock2: ShopInterface = {
  id: 2,
  description: 'Loja Mock Teste 2',
};

export const shopsMock: ShopInterface[] = [shopMock, shopMock2];

export const createShopDtoMock: CreateShopDto = {
  description: 'Loja Mock Teste Criação',
};

export const updateShopDtoMock: UpdateShopDto = {
  id,
  description: 'Loja Mock Teste Criação',
};
