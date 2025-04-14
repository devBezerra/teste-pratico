import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopInterface } from './interfaces/shop.interface';
import { IsNull, Not, Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopsRepository: Repository<Shop>,
  ) { }

  async create(
    createShopDto: CreateShopDto,
  ): Promise<{ shop: ShopInterface; message: string }> {
    try {
      const entity = Object.assign(new Shop(), createShopDto);
      const shop = await this.shopsRepository.save(entity);

      return { shop, message: 'A loja foi criada com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível criar a loja.' },
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async findWithPaginate(page = 1, limit = 10) {
    try {
      const [data, total] = await this.shopsRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'DESC' },
      });

      const totalPages = Math.ceil(total / limit);

      return {
        content: data,
        totalItems: total,
        totalPages,
        currentPage: page,
      };
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
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByDescription(description: string, shop: ShopInterface) {
    try {
      const id: number = shop.id || 0;

      return await this.shopsRepository.findOne({
        where: {
          description,
          id: Not(id),
          deletedAt: IsNull(),
        },
        select: ['description'],
      });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar a loja.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateShopDto: UpdateShopDto,
  ): Promise<{ shop: ShopInterface; message: string }> {
    try {
      const entity = Object.assign(new Shop(), { ...updateShopDto, id });
      await this.shopsRepository.save(entity);

      const shop = await this.shopsRepository.findOneOrFail({ where: { id } });
      return { shop, message: 'A loja foi atualizada com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar a loja.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.shopsRepository.softDelete(id);
      return { message: 'A loja foi removida com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível excluir a loja.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
