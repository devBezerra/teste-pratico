import { PartialType } from '@nestjs/mapped-types';
import { CreateProductShopDto } from './create-product-shop.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProductShopDto extends PartialType(CreateProductShopDto) {
  @IsNotEmpty({ message: 'O campo de ID do produto é obrigatório.' })
  @IsInt({ message: 'O campo de ID do produto precisa ser um inteiro.' })
  id: number;
}
