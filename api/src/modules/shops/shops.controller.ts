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
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopInterface } from './interfaces/shop.interface';
import { ShopIdExistPipe } from './pipes/shop-id-exist.pipe';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @Post()
  async create(
    @Body() createShopDto: CreateShopDto,
  ): Promise<{ shop: ShopInterface; message: string }> {
    return await this.shopsService.create(createShopDto);
  }

  @Get()
  async findAll(): Promise<ShopInterface[]> {
    return await this.shopsService.findAll();
  }

  @Get('paginate')
  async findWithPaginate(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<any> {
    return await this.shopsService.findWithPaginate(+page, +limit);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, ShopIdExistPipe) id: number,
  ): Promise<ShopInterface> {
    return await this.shopsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe, ShopIdExistPipe) id: string,
    @Body() updateShopDto: UpdateShopDto,
  ): Promise<{ shop: ShopInterface; message: string }> {
    return await this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe, ShopIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.shopsService.remove(+id);
  }
}
