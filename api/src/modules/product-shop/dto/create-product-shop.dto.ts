import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductShopDto {
  @IsNotEmpty({ message: 'O campo de ID do produto é obrigatório.' })
  @IsInt({ message: 'O campo de ID do produto precisa ser um inteiro.' })
  productId: number;

  @IsNotEmpty({ message: 'O campo de ID da loja é obrigatório.' })
  @IsInt({ message: 'O campo de ID da loja precisa ser um inteiro.' })
  shopId: number;

  @IsDecimal(
    { force_decimal: true },
    { message: 'O campo de preço precisa ser um numero.' },
  )
  @IsNotEmpty({ message: 'O preço de custo é obrigatório.' })
  price: string;
}
