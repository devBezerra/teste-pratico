import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductInterface, ResponsePaginatedProductRoute } from '../../interfaces/product.interface';
import { ProductService } from '../../product.service';
import { PaginatorState } from 'primeng/paginator';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DecimalCommaPipe } from '../../../../shared/pipes/decimal-comma.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent, ConfirmDialog, TableModule, ButtonModule, DecimalCommaPipe, RouterModule],
  providers: [ConfirmationService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  public loading: WritableSignal<boolean> = signal(false);

  public products: ProductInterface[] = [];
  public totalProducts: number = 0;
  public rows: number = 10;
  public first: number = 0;

  private readonly productService = inject(ProductService);
  private readonly confirmationService = inject(ConfirmationService);

  constructor() {
    this.getProductsList();
  }

  private getProductsList(): void {
    this.loading.set(true);
    this.productService.getProductList()
      .subscribe({
        next: (response: ResponsePaginatedProductRoute) => {
          this.products = response.content;
          this.totalProducts = response.totalItems;
        },
        complete: () => (this.loading.set(false))
      })
  }

  public onPageChange(event: PaginatorState) {
    if (typeof event?.first === 'number' && typeof event?.rows === 'number') {
      this.productService.alterPage(event?.first / event?.rows + 1);
    }
    this.getProductsList();
  }

  deleteProduct(id: number) {
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
        this.productService.deleteProduct(id).subscribe(() => this.getProductsList());
      },
      reject: () => { }
    })
  }
}
