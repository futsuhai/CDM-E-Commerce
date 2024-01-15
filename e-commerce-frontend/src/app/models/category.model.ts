import { ProductCategory } from "./product.model";

export interface ICategory {
    key: string;
    value: ProductCategory;
    image: string;
}

export const appCategories: ICategory[] = [
    {
        key: "Молоко, сыр, яйцо",
        value: ProductCategory.lactic,
        image: "assets/catalog/category_1.svg"
    },
    {
        key: "Хлеб",
        value: ProductCategory.bread,
        image: "assets/catalog/category_2.svg"
    },
    {
        key: "Фрукты и овощи",
        value: ProductCategory.vegetables,
        image: "assets/catalog/category_3.svg"
    },
    {
        key: "Замороженные продукты",
        value: ProductCategory.frozen,
        image: "assets/catalog/category_4.svg"
    },
    {
        key: "Напитки",
        value: ProductCategory.beverages,
        image: "assets/catalog/category_5.svg"
    },
    {
        key: "Кондитерские изделия",
        value: ProductCategory.cakes,
        image: "assets/catalog/category_6.svg"
    },
    {
        key: "Чай, кофе",
        value: ProductCategory.tea,
        image: "assets/catalog/category_7.svg"
    },
    {
        key: "Бакалея",
        value: ProductCategory.grocery,
        image: "assets/catalog/category_8.svg"
    },
    {
        key: "Здоровое питание",
        value: ProductCategory.healthy,
        image: "assets/catalog/category_9.svg"
    },
    {
        key: "Зоотовары",
        value: ProductCategory.zoo,
        image: "assets/catalog/category_10.svg"
    },
    {
        key: "Детское питание",
        value: ProductCategory.childish,
        image: "assets/catalog/category_11.svg"
    },
    {
        key: "Мясо, птица, колбаса",
        value: ProductCategory.meat,
        image: "assets/catalog/category_12.svg"
    },
    {
        key: "Непродовольственные товары",
        value: ProductCategory.no_food,
        image: "assets/catalog/category_13.svg"
    }
]
