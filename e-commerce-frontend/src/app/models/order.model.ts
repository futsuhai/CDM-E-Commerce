import { IBasketProduct } from "./basketProduct.model";

export interface IOrder {
    orderProducts: IBasketProduct[],
    orderPrice: number,
    orderStatus: OrderStatus,
    orderDate: Date
}

export enum OrderStatus {
    progress = 'progress',
    complete = 'complete',
    canceled = 'canceled'
}


export interface IOrderStatus {
    key: string;
    value: OrderStatus;
}

export const appOrderStatuses: IOrderStatus[] = [
    { 
        key: "Выполняется", 
        value: OrderStatus.progress
    },
    { 
        key: "Выполнен", 
        value: OrderStatus.complete
    },
    { 
        key: "Отменён", 
        value: OrderStatus.canceled 
    },
]