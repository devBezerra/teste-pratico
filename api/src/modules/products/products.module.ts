import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductIdExistPipe } from './pipes/product-id-exist.pipe';
import { ProductDescriptionAlreadyExist } from './validate/product-description-already-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductIdExistPipe,
    ProductDescriptionAlreadyExist,
  ],
})
export class ProductsModule {}
