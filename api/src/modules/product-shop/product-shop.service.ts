import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ProductShop } from './entities/product-shop.entity';
import { CreateProductShopDto } from './dto/create-product-shop.dto';
import { ProductShopInterface } from './interfaces/product-shop.interface';
import { UpdateProductShopDto } from './dto/update-product-shop.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductShopService {
  constructor(
    @InjectRepository(ProductShop)
    private readonly productShopRepository: Repository<ProductShop>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductShopDto: CreateProductShopDto,
  ): Promise<{ productShop: ProductShopInterface; message: string }> {
    try {
      const duplicate = await this.checkDuplicated(
        createProductShopDto.shopId,
        createProductShopDto.productId,
      );

      if (duplicate) {
        throw new HttpException(
          { message: 'Já existe este produto vinculado a esta loja.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const product = await this.productRepository.findOne({
        where: { id: createProductShopDto.productId },
      });

      if (product?.cost! > Number(createProductShopDto.price)) {
        throw new HttpException(
          { message: 'Preço abaixo do custo do produto.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const entity = Object.assign(new ProductShop(), createProductShopDto);
      const productShop = await this.productShopRepository.save(entity);

      return {
        productShop,
        message: 'O vínculo foi criado com sucesso.',
      };
    } catch (error) {
      let message: string = '';
      if (error.message) {
        message = error.message;
      }
      throw new HttpException(
        { message: message || 'Não foi possível criar o vínculo.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ProductShopInterface[]> {
    try {
      return await this.productShopRepository.find();
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar os vínculos.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<ProductShopInterface> {
    try {
      return await this.productShopRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { message: 'Não foi possível encontrar o vínculo.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkDuplicated(
    shopId: number,
    productId: number,
  ): Promise<ProductShopInterface | null> {
    try {
      return await this.productShopRepository.findOne({
        where: {
          shopId,
          productId,
          deletedAt: IsNull(),
        },
      });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar o vínculo.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateProductShopDto: UpdateProductShopDto,
  ): Promise<{ productShop: ProductShopInterface; message: string }> {
    try {
      const duplicate = await this.checkDuplicated(
        updateProductShopDto.shopId!,
        updateProductShopDto.productId!,
      );

      if (duplicate) {
        throw new HttpException(
          { message: 'Já existe este produto vinculado a esta loja.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const product = await this.productRepository.findOne({
        where: { id: updateProductShopDto.productId },
      });

      if (product?.cost! > Number(updateProductShopDto.price)) {
        throw new HttpException(
          { message: 'Preço abaixo do custo do produto.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const entity = Object.assign(new ProductShop(), {
        ...updateProductShopDto,
        id,
      });
      await this.productShopRepository.save(entity);

      const productShop = await this.productShopRepository.findOneOrFail({
        where: { id },
      });
      return { productShop, message: 'O vínculo foi atualizado com sucesso.' };
    } catch (error) {
      let message: string = '';
      if (error.message) {
        message = error.message;
      }
      throw new HttpException(
        { message: message || 'Não foi possível atualizar o vínculo.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.productShopRepository.softDelete(id);
      return { message: 'O vínculo foi removido com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível excluir o vínculo.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
