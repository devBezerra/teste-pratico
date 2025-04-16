import { DefaultInterface } from "../../../shared/interfaces/default-columns.interface";
import { DefaultPaginatedResponseInterface } from "../../../shared/interfaces/default-paginated-response.interface";
import { ShopInterface } from "../../shop/interfaces/shop.interface";

export interface ProductInterface extends DefaultInterface {
  description: string;
  cost: number;
  productsShop: ProductsShopInterface[];
}

export interface ResponsePaginatedProductRoute extends DefaultPaginatedResponseInterface {
  content: ProductInterface[];
}

export interface ProductsShopInterface extends DefaultInterface {
  price: number;
  shopId: number;
  productId: number;
  shop: ShopInterface;
}
