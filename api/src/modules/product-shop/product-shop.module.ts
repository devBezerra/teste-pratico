import { Module } from '@nestjs/common';
import { ProductShopService } from './product-shop.service';
import { ProductShopController } from './product-shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductShop } from './entities/product-shop.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductShop, Product])],
  controllers: [ProductShopController],
  providers: [ProductShopService],
})
export class ProductShopModule {}
