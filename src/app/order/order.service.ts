import { LoginService } from 'app/security/login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from './../app.api';
import { ShoppingCartService } from './../restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";
import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {


    constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService) {

    }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem): any {
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {

        let headers = new HttpHeaders();
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization',`bearer ${this.loginService.user.accessToken}`)
        }

        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            .map(order => order.id); //Para retornar apenas o ID
    }

    clear(): any {
        this.cartService.clear()
    }
}