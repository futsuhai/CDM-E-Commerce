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
    articul: number,
    product64Images: string[],
    productMain64Image: string,
    productTag: ProductTag,
    productCategory: ProductCategory,
    rewievs: IRewiev[];
}

export enum ProductTag {
    none = 'none',
    news = 'news',
    sales = 'sales'
}

export enum ProductCategory {
    lactic = 'lactic',
    bread = 'bread',
    vegetables = 'vegetables',
    frozen = 'frozen',
    beverages = 'beverages',
    cakes = 'cakes',
    tea = 'tea',
    grocery = 'grocery',
    healthy = 'healthy',
    zoo = 'zoo',
    childish = 'childish',
    meat = 'meat',
    no_food = 'no_food'
}

export interface IRewiev {
    username: string;
    date: Date;
    rating: number;
    description?: string;
}
