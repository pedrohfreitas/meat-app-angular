import { MEAT_API } from './../app.api';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ShoppingCartService } from './../restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";
import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {


    constructor(private cartService: ShoppingCartService, private http: Http) {

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
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${MEAT_API}/orders`,
            JSON.stringify(order),
            new RequestOptions({ headers: headers }))
            .map(response => response.json());
    }

    clear(): any {
        this.cartService.clear()
    }
}