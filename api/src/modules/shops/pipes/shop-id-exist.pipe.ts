import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from '../entities/shop.entity';

@Injectable()
export class ShopIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) {}

  async transform(id: number): Promise<number> {
    const shop = await this.shopsRepository.findOne({ where: { id } });

    if (!shop) {
      throw new NotFoundException(
        'Loja não encontrada',
        `Não foi possível encontrar uma loja com esse ID: ${id}`,
      );
    }

    return id;
  }
}
