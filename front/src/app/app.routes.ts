import { Routes } from '@angular/router';
import { ShopListComponent } from './modules/shop/components/shop-list/shop-list.component';
import { ShopFormComponent } from './modules/shop/components/shop-form/shop-form.component';

export const routes: Routes = [
  {
    path: "",
    component: ShopListComponent
  },
  {
    path: "cadastrar",
    component: ShopFormComponent
  }
];
