import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { ProductInterface, ProductsShopInterface } from '../../interfaces/product.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateRequired } from '../../../../shared/validators/required.validator';
import { TableModule } from 'primeng/table';
import { DecimalCommaPipe } from '../../../../shared/pipes/decimal-comma.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-form',
  imports: [HeaderComponent, TableModule, DecimalCommaPipe, ReactiveFormsModule,
    InputNumberModule, InputTextModule, ButtonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public loading: WritableSignal<boolean> = signal(false);

  id!: number
  product!: ProductInterface;
  productsShop!: ProductsShopInterface[];

  form!: FormGroup;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router)

  constructor() {
    this.initForm();
    this.verifyId();
  }

  verifyId(): void {
    this.loading.set(true);
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = parseInt(params.get('id'));
      if (this.id) {
        void this.productService
          .getProduct(this.id)
          .subscribe((product: ProductInterface) => {
            this.product = product;
            this.form.patchValue(this.product);
            this.productsShop = product.productsShop;
          });
      }
      this.loading.set(false);
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      description: new FormControl(null, [ValidateRequired, Validators.minLength(3)]),
      cost: new FormControl(null, [ValidateRequired])
    });
  }

  handleSaveOrUpdate(): void {
    const id = this.id;
    if (!!id) {
      this.productService
        .updateProduct({ ...this.form.value, id }, id)
        .subscribe();
    } else {
      const cost = this.form.get("cost")?.value.toFixed(2);
      this.productService.createProduct({ ...this.form.value, cost })
        .subscribe((response) => {
          this.router.navigateByUrl(`/produtos/editar/${response.product.id}`)
        });
    }
  }

  get boundHandleSaveOrUpdate(): () => void {
    return () => this.handleSaveOrUpdate();
  }
}
