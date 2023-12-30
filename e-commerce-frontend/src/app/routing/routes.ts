import { Routes } from "@angular/router";
import { HomeComponent } from "../components/pages/home/home.component";
import { AuthComponent } from "../components/pages/auth/auth.component";
import { CatalogComponent } from "../components/pages/catalog/catalog.component";
import { LikedComponent } from "../components/pages/liked/liked.component";
import { BasketComponent } from "../components/pages/basket/basket.component";
import { OrdersComponent } from "../components/pages/orders/orders.component";
import { ProfileComponent } from "../components/pages/profile/profile.component";

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
        component: CatalogComponent
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

]