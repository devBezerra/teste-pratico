import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductInterface } from './interfaces/product.interface';
import { ProductIdExistPipe } from './pipes/product-id-exist.pipe';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ product: ProductInterface; message: string }> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<ProductInterface[]> {
    return await this.productsService.findAll();
  }

  @Get('paginate')
  async findWithPaginate(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    return await this.productsService.findWithPaginate(+page, +limit);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, ProductIdExistPipe) id: number,
  ): Promise<ProductInterface> {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe, ProductIdExistPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ product: ProductInterface; message: string }> {
    return await this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe, ProductIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.productsService.remove(+id);
  }
}
