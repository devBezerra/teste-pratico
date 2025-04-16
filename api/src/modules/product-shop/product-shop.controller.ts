import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductShopService } from './product-shop.service';
import { CreateProductShopDto } from './dto/create-product-shop.dto';
import { ProductShopInterface } from './interfaces/product-shop.interface';
import { ProductShopIdExistPipe } from './pipes/product-shop-id-exist.pipe';
import { UpdateProductShopDto } from './dto/update-product-shop.dto';

@Controller('product-shop')
export class ProductShopController {
  constructor(private readonly productShopService: ProductShopService) {}

  @Post()
  async create(
    @Body() createProductShopDto: CreateProductShopDto,
  ): Promise<{ productShop: ProductShopInterface; message: string }> {
    return await this.productShopService.create(createProductShopDto);
  }

  @Get()
  async findAll(): Promise<ProductShopInterface[]> {
    return await this.productShopService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, ProductShopIdExistPipe) id: number,
  ): Promise<ProductShopInterface> {
    return await this.productShopService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe, ProductShopIdExistPipe) id: string,
    @Body() updateProductShopDto: UpdateProductShopDto,
  ): Promise<{ productShop: ProductShopInterface; message: string }> {
    return await this.productShopService.update(+id, updateProductShopDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe, ProductShopIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.productShopService.remove(+id);
  }
}
