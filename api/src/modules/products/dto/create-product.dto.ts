import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ProductDescriptionAlreadyExist } from '../validate/product-description-already-exist.constraint';

export class CreateProductDto {
  @Validate(ProductDescriptionAlreadyExist, {
    message: 'Já existe um produto com este nome.',
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

  @IsDecimal(
    { force_decimal: true },
    { message: 'O campo de custo precisa ser um numero.' },
  )
  @IsNotEmpty({ message: 'O campo de custo é obrigatório.' })
  cost: number;
}
