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

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'catalog',
        component: CategoriesComponent
    },
    {
        path: 'liked',
        component: LikedComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'basket',
        component: BasketComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
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
        component: SearchComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]