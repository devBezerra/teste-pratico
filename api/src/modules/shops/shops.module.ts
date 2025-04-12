import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { ShopDescriptionAlreadyExist } from './validate/shop-description-already-exist.constraint';
import { ShopIdExistPipe } from './pipes/shop-id-exist.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  controllers: [ShopsController],
  providers: [ShopsService, ShopDescriptionAlreadyExist, ShopIdExistPipe],
})
export class ShopsModule { }
