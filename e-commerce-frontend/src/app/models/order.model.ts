import { IBasketProduct } from "./basketProduct.model";

export interface IOrder {
    id?: string,
    orderProducts: IBasketProduct[],
    orderPrice: number,
    orderStatus: OrderStatus,
    orderInfo: IOrderInfo
}

export interface IOrderInfo {
    orderCity: string,
    orderStreet: string,
    orderHouse: string,
    orderFlat: string,
    orderDate: Date,
    orderPhone: string,
    orderTime: OrderDeliverTime
}

export enum OrderStatus {
    progress = 'progress',
    complete = 'complete',
    canceled = 'canceled'
}

export enum OrderDeliverTime {
    morning = 'morning',
    day = 'day',
    evening = 'evening',
    night = 'night'
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

export interface IOrderDeliverTime {
    key: string;
    value: OrderDeliverTime;
}

export const appDeliverTimes: IOrderDeliverTime[] = [
    { 
        key: "08:00 - 14:00", 
        value: OrderDeliverTime.morning
    },
    { 
        key: "14:00 - 18:00", 
        value: OrderDeliverTime.day
    },
    { 
        key: "18:00 - 20:00", 
        value: OrderDeliverTime.evening
    },
    { 
        key: "20:00 - 22:00", 
        value: OrderDeliverTime.night 
    },
]