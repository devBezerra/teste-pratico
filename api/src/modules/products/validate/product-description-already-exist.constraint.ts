import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductsService } from '../products.service';
import { ProductInterface } from '../interfaces/product.interface';

let service: ProductsService;

@ValidatorConstraint({ name: 'ProductDescriptionAlreadyExist', async: true })
export class ProductDescriptionAlreadyExist
  implements ValidatorConstraintInterface, OnModuleInit
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit(): void {
    service = this.moduleRef.get(ProductsService);
  }

  async validate(
    description: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const product: ProductInterface = Object.assign(validationArguments.object);
    const entity = await service.findByDescription(description, product);
    return !entity;
  }
}
