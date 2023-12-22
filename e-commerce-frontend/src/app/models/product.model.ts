export interface IProduct {
    id: string,
    cardPrice: number,
    commonPrice: number,
    title: string,
    country: string,
    rating: number,
    discount: number,
    brand: string,
    weight: number,
    acticul: number,
    base64Image: string,
    productTag: ProductTag
}

export enum ProductTag {
    none = 'none',
    news = 'news',
    sales = 'sales'
}
