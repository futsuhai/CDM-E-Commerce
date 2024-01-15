import { ProductTag } from "./product.model";

export interface ITag {
    key: string;
    value: ProductTag;
}

export const appTags: ITag[] = [
    { 
        key: "Новинки", 
        value: ProductTag.news
    },
    { 
        key: "Скидки", 
        value: ProductTag.sales 
    },
]