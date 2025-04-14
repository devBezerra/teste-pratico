import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty({ message: 'O campo de ID do produto é obrigatório.' })
  @IsInt({ message: 'O campo de ID do produto precisa ser um inteiro.' })
  id: number;
}
