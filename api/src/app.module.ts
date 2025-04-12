import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './modules/shops/shops.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, ShopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
