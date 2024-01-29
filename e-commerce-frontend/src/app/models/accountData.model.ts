import { IBasketProduct } from "./basketProduct.model";
import { IProduct } from "./product.model";

export interface IAccountData {
    liked: IProduct[],
    basket: IBasketProduct[],
    orders: string[]
}