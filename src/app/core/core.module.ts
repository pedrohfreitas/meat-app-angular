import { RestaurantsService } from './../restaurants/restaurants.service';
import { NgModule } from "@angular/core";
import { ShoppingCartService } from "app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service";
import { OrderService } from "app/order/order.service";


//OBSOLOTE - Não utilizado , apenas de exemplo
@NgModule({
    providers: [ShoppingCartService, OrderService, RestaurantsService]
})
export class CoreModule {

}