import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async transform(id: number): Promise<number> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(
        'Producto não encontrado',
        `Não foi possível encontrar um produto com esse ID: ${id}`,
      );
    }

    return id;
  }
}
