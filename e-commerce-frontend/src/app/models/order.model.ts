import { IBasketProduct } from "./basketProduct.model";

export interface IOrder {
    orderProducts: IBasketProduct[],
    orderPrice: number
    orderStatus: OrderStatus
}

export enum OrderStatus {
    performed = 'performed',
    complete = 'complete',
    canceled = 'canceled'
}