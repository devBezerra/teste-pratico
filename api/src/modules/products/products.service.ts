import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { IsNull, Not, Repository } from 'typeorm';
import {
  PaginatedRouteProductReturn,
  ProductInterface,
} from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ product: ProductInterface; message: string }> {
    try {
      const entity = Object.assign(new Product(), createProductDto);
      const product = await this.productRepository.save(entity);

      return { product, message: 'O produto foi criado com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível criar o produto.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ProductInterface[]> {
    try {
      return await this.productRepository.find();
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar os produtos.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWithPaginate(
    page = 1,
    limit = 10,
  ): Promise<PaginatedRouteProductReturn> {
    try {
      const [data, total] = await this.productRepository.findAndCount({
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
        { message: 'Não foi possível encontrar os produtos.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<ProductInterface> {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id },
        relations: ['productsShop', 'productsShop.shop'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível encontrar o produto.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByDescription(
    description: string,
    product: ProductInterface,
  ): Promise<ProductInterface | null> {
    try {
      const id: number = product.id || 0;

      return await this.productRepository.findOne({
        where: {
          description,
          id: Not(id),
          deletedAt: IsNull(),
        },
        select: ['description'],
      });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar o produto.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<{ product: ProductInterface; message: string }> {
    try {
      const entity = Object.assign(new Product(), { ...updateProductDto, id });
      await this.productRepository.save(entity);

      const product = await this.productRepository.findOneOrFail({
        where: { id },
      });
      return { product, message: 'O produto foi atualizado com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar o produto.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.productRepository.softDelete(id);
      return { message: 'O produto foi removido com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível excluir o produto.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
