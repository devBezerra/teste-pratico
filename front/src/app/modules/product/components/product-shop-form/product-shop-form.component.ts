import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ProductsShopInterface } from '../../interfaces/product.interface';
import { ProductService } from '../../product.service';
import { ButtonModule } from 'primeng/button';
import { ValidateRequired } from '../../../../shared/validators/required.validator';
import { SelectModule } from 'primeng/select';
import { ShopInterface } from '../../../shop/interfaces/shop.interface';
import { ShopService } from '../../../shop/shop.service';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'tp-product-shop-form',
  imports: [DialogModule, ButtonModule, ReactiveFormsModule, SelectModule, InputNumber],
  templateUrl: './product-shop-form.component.html',
  styleUrl: './product-shop-form.component.scss'
})
export class ProductShopFormComponent {
  visible = input<boolean>(false);
  closed = output<void>();

  id = input<number | null>(null);

  productId = input<number | null>(null);

  public shops: ShopInterface[] = [];

  form!: FormGroup;
  productShop!: ProductsShopInterface;

  private readonly productService = inject(ProductService);
  private readonly shopService = inject(ShopService);

  constructor() {
    this.initForm();
    this.getShops();
    effect(() => {
      const id = this.id();
      if (!!id) {
        this.verifyId();
      }
    });
    effect(() => {
      const productId = this.productId();
      if (!!productId) {
        this.form.get("productId")?.setValue(productId);
      }
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      productId: new FormControl(null),
      shopId: new FormControl(null, [ValidateRequired]),
      price: new FormControl(null, [ValidateRequired]),
    })
  }

  verifyId(): void {
    const id = this.id();
    if (!!id) {
      void this.productService
        .getProductShop(id)
        .subscribe((productShop: ProductsShopInterface) => {
          this.productShop = productShop;
          this.form.patchValue(this.productShop);
        });
    };
  }

  getShops(): void {
    this.shopService.getAllShops()
      .subscribe((shops: ShopInterface[]) => {
        this.shops = shops;
      })
  }

  handleSaveOrUpdate(): void {
    const id = this.id();
    const price = this.form.get("price")?.value.toFixed(2);
    if (!!id) {
      this.productService
        .updateProductShop({ ...this.form.value, price, id }, id)
        .subscribe(() => {
          this.close()
        });
    } else {
      this.productService.createProductShop({ ...this.form.value, price })
        .subscribe(() => {
          this.close()
        });
    }
  }

  close(): void {
    this.form.reset();
    this.closed.emit();
  }
}
