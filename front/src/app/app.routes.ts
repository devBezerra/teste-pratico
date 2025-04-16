import { Routes } from '@angular/router';
import { ShopListComponent } from './modules/shop/components/shop-list/shop-list.component';
import { ShopFormComponent } from './modules/shop/components/shop-form/shop-form.component';
import { ProductListComponent } from './modules/product/components/product-list/product-list.component';
import { ProductFormComponent } from './modules/product/components/product-form/product-form.component';

export const routes: Routes = [
  {
    path: "lojas",
    component: ShopListComponent
  },
  {
    path: "cadastrar",
    component: ShopFormComponent
  },
  {
    path: "produtos",
    component: ProductListComponent
  },
  {
    path: "produtos/cadastrar",
    component: ProductFormComponent
  },
  {
    path: "produtos/editar/:id",
    component: ProductFormComponent
  }
];
