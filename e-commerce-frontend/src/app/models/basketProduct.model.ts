import { IProduct } from "./product.model";

export interface IBasketProduct {
    product: IProduct,
    count: number,
    finalPrice: number,
    isChecked: boolean;
}