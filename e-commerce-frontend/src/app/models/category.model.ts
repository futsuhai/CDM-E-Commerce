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
        image: "assets/catalog/lactic.jpg"
    },
    {
        key: "Хлеб",
        value: ProductCategory.bread,
        image: "assets/catalog/bread.jpg"
    },
    {
        key: "Фрукты и овощи",
        value: ProductCategory.vegetables,
        image: "assets/catalog/vegetables.jpg"
    },
    {
        key: "Замороженные продукты",
        value: ProductCategory.frozen,
        image: "assets/catalog/frozen.jpg"
    },
    {
        key: "Напитки",
        value: ProductCategory.beverages,
        image: "assets/catalog/beverages.jpg"
    },
    {
        key: "Кондитерские изделия",
        value: ProductCategory.cakes,
        image: "assets/catalog/cakes.jpg"
    },
    {
        key: "Чай, кофе",
        value: ProductCategory.tea,
        image: "assets/catalog/tea.jpg"
    },
    {
        key: "Бакалея",
        value: ProductCategory.grocery,
        image: "assets/catalog/grocery.jpg"
    },
    {
        key: "Здоровое питание",
        value: ProductCategory.healthy,
        image: "assets/catalog/healthy.jpg"
    },
    {
        key: "Зоотовары",
        value: ProductCategory.zoo,
        image: "assets/catalog/zoo.jpg"
    },
    {
        key: "Детское питание",
        value: ProductCategory.childish,
        image: "assets/catalog/childish.jpg"
    },
    {
        key: "Мясо, птица, колбаса",
        value: ProductCategory.meat,
        image: "assets/catalog/meat.jpg"
    },
    {
        key: "Непродовольственные товары",
        value: ProductCategory.no_food,
        image: "assets/catalog/no_food.jpg"
    }
]
