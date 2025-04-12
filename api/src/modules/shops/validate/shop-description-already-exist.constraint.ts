import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ShopsService } from '../shops.service';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ShopInterface } from '../interfaces/shop.interface';

let service: ShopsService;

@ValidatorConstraint({ name: 'ShopDescriptionAlreadyExist', async: true })
export class ShopDescriptionAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit {
  constructor(private moduleRef: ModuleRef) { }

  onModuleInit(): void {
    service = this.moduleRef.get(ShopsService);
  }

  async validate(
    description: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const shop: ShopInterface = Object.assign(validationArguments.object);
    const entity = await service.findByDescription(description, shop);
    return !entity;
  }
}
