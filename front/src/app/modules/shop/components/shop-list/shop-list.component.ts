import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ShopService } from '../../shop.service';
import { ResponsePaginatedShopRoute, ShopInterface } from '../../interfaces/shop.interface';
import { TableModule } from 'primeng/table'
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ShopFormComponent } from '../shop-form/shop-form.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'tp-shop-list',
  imports: [HeaderComponent, TableModule, SkeletonModule, ButtonModule, ShopFormComponent, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss'
})
export class ShopListComponent {
  public loading: WritableSignal<boolean> = signal(false);
  public showDialog: WritableSignal<boolean> = signal(false);
  public showDeleteDialog: WritableSignal<boolean> = signal(false);

  public shops: ShopInterface[] = [];
  public totalShops: number = 0;
  public rows: number = 10;
  public first: number = 0;

  public selectedShopId: WritableSignal<number | null> = signal(null);

  private readonly shopService = inject(ShopService);
  private readonly confirmationService = inject(ConfirmationService);

  constructor() {
    this.getShopsList();
  }

  private getShopsList(): void {
    this.loading.set(true);
    this.shopService.getShopList()
      .subscribe({
        next: (response: ResponsePaginatedShopRoute) => {
          this.shops = response.content;
          this.totalShops = response.totalItems;
        },
        complete: () => (this.loading.set(false))
      })
  }

  public onPageChange(event: PaginatorState) {
    if (typeof event?.first === 'number' && typeof event?.rows === 'number') {
      this.shopService.alterPage(event?.first / event?.rows + 1);
    }
    this.getShopsList();
  }

  closeDialog(result: string): void {
    this.showDialog.set(false);
    this.selectedShopId.set(null);
    if (result !== 'none') {
      this.getShopsList();
    }
  }

  openEditDialog(id: number) {
    this.selectedShopId.set(id);
    this.showDialog.set(true);
  }

  deleteShop(id: number) {
    this.confirmationService.confirm({
      header: 'Exclusão de registro',
      message: 'Tem certeza que quer excluir essa loja?',
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
        this.shopService.deleteShop(id).subscribe(() => this.getShopsList());
      },
      reject: () => { }
    })
  }
}
