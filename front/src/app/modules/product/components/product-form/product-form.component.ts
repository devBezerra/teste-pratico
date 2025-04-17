import { Component, inject, signal, WritableSignal } from '@angular/core';
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
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProductShopFormComponent } from '../product-shop-form/product-shop-form.component';

@Component({
  selector: 'app-product-form',
  imports: [HeaderComponent, TableModule, DecimalCommaPipe, ReactiveFormsModule,
    InputNumberModule, InputTextModule, ButtonModule, ConfirmDialog, ProductShopFormComponent],
  providers: [ConfirmationService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  public loading: WritableSignal<boolean> = signal(false);
  public showDialog: WritableSignal<boolean> = signal(false);
  public productId: WritableSignal<number | null> = signal(null);
  public productShopId: WritableSignal<number | null> = signal(null);

  id!: number
  product!: ProductInterface;
  productsShop!: ProductsShopInterface[];

  form!: FormGroup;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router)
  private readonly confirmationService = inject(ConfirmationService);

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

  deleteProduct() {
    const id = this.id;
    this.confirmationService.confirm({
      header: 'Exclusão de registro',
      message: 'Tem certeza que quer excluir esse produto?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
        outlined: true,
      },
      accept: () => {
        this.productService.deleteProduct(id).subscribe(() => this.router.navigateByUrl('/produtos'));
      },
      reject: () => { }
    })
  }

  deleteProductShop(id: number): void {
    this.confirmationService.confirm({
      header: 'Exclusão de registro',
      message: 'Tem certeza que quer excluir esse vínculo?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
        outlined: true,
      },
      accept: () => {
        this.productService.deleteProductShop(id).subscribe(() => { this.verifyId() });
      },
      reject: () => { }
    })

  }

  closeDialog(): void {
    this.showDialog.set(false);
    this.verifyId();
  }

  openDialog(id: number): void {
    this.productId.set(id);
    this.showDialog.set(true);
  }

  openEditDialog(id: number): void {
    this.productShopId.set(id);
    this.showDialog.set(true)
  }

  get boundHandleSaveOrUpdate(): () => void {
    return () => this.handleSaveOrUpdate();
  }

  get boundDelete(): () => void {
    return () => this.deleteProduct();
  }
}
