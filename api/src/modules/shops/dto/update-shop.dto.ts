import { PartialType } from '@nestjs/mapped-types';
import { CreateShopDto } from './create-shop.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @IsNotEmpty({ message: 'O campo de ID da loja é obrigatório.' })
  @IsInt({ message: 'O campo de ID da loja precisa ser um inteiro.' })
  id: number;
}
