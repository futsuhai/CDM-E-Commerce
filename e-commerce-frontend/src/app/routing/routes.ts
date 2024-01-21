import { Routes } from "@angular/router";
import { HomeComponent } from "../components/pages/home/home.component";
import { AuthComponent } from "../components/pages/auth/auth.component";
import { CategoriesComponent } from "../components/pages/categories/categories.component";
import { LikedComponent } from "../components/pages/liked/liked.component";
import { BasketComponent } from "../components/pages/basket/basket.component";
import { OrdersComponent } from "../components/pages/orders/orders.component";
import { ProfileComponent } from "../components/pages/profile/profile.component";
import { NotFoundComponent } from "../components/pages/not-found/not-found.component";
import { ProductDetailComponent } from "../components/pages/product-detail/product-detail.component";
import { SearchComponent } from "../components/pages/search/search.component";
import { AdminComponent } from "../components/pages/admin/admin.component";
import { authGuard } from "../guards/auth.guard";
import { adminGuard } from "../guards/admin.guard";
import { ProductDetailAdminComponent } from "../components/layout/product-detail-admin/product-detail-admin.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        title: 'Северяночка',
        component: HomeComponent
    },
    {
        path: 'auth',
        title: 'Авторизация',
        component: AuthComponent
    },
    {
        path: 'catalog',
        title: 'Каталог',
        component: CategoriesComponent
    },
    {
        path: 'liked',
        title: 'Избранное',
        component: LikedComponent
    },
    {
        path: 'orders',
        title: 'Заказы',
        component: OrdersComponent
    },
    {
        path: 'basket',
        title: 'Корзина',
        component: BasketComponent
    },
    {
        path: 'profile',
        title: 'Личный кабинет',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'product-detail',
        children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: ProductDetailComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'search',
        title: 'Поиск товаров',
        component: SearchComponent
    },
    {
        path: 'admin',
        title: 'Админ-Панель',
        component: AdminComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'editProduct',
        title: 'Админ-Панель',
        component: ProductDetailAdminComponent,
        canActivate: [adminGuard],
    },
    {
        path: '**',
        title: 'Северяночка',
        component: NotFoundComponent
    }
]