import { NotFoundComponent } from './not-found/not-found.component';
import { ReviewsComponent } from './restaurants/restaurant-detail/reviews/reviews.component';
import { MenuComponent } from './restaurants/restaurant-detail/menu/menu.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router'
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { OrderSumaryComponent } from './order/order-sumary/order-sumary.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent }, //Component principal quando não tiver informação na URL
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'order', loadChildren: './order/order.module#OrderModule' },
    { path: 'order-sumary', component: OrderSumaryComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: MenuComponent },
            { path: 'reviews', component: ReviewsComponent }
        ]
    },
    { path: '**', component: NotFoundComponent },//WildCard Route - Sempre ficar no final

]