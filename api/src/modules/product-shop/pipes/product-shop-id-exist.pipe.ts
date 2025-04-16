import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductShop } from '../entities/product-shop.entity';

@Injectable()
export class ProductShopIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(ProductShop)
    private readonly productsShopRepository: Repository<ProductShop>,
  ) {}

  async transform(id: number): Promise<number> {
    const productShop = await this.productsShopRepository.findOne({
      where: { id },
    });

    if (!productShop) {
      throw new NotFoundException(
        'Vínculo não encontrado',
        `Não foi possível encontrar um vínculo com esse ID: ${id}`,
      );
    }

    return id;
  }
}
