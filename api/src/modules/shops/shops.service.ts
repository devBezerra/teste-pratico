import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopInterface } from './interfaces/shop.interface';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) { }

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  async findAll(): Promise<ShopInterface[]> {
    try {
      return await this.shopsRepository.find();
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar as lojas.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<ShopInterface> {
    try {
      return await this.shopsRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar a loja.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
