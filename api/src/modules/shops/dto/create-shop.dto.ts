import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ShopDescriptionAlreadyExist } from '../validate/shop-description-already-exist.constraint';

export class CreateShopDto {
  @Validate(ShopDescriptionAlreadyExist, {
    message: 'Já existe uma loja com este nome.',
  })
  @IsString({ message: 'O campo de descrição precisa ser uma string.' })
  @IsNotEmpty({ message: 'O campo de descrição é obrigatório.' })
  @MinLength(3, {
    message: 'O campo de descrição precisa ter pelo menos 3 caracteres.',
  })
  @MaxLength(50, {
    message: 'O campo de descrição pode ter no máximo 50 caracteres.',
  })
  description: string;
}
