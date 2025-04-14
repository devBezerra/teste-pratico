import { DefaultInterface } from "../../../shared/interfaces/default-columns.interface";
import { DefaultPaginatedResponseInterface } from "../../../shared/interfaces/default-paginated-response.interface";

export interface ShopInterface extends DefaultInterface {
  description: string;
}

export interface ResponsePaginatedShopRoute extends DefaultPaginatedResponseInterface {
  content: ShopInterface[];
}
