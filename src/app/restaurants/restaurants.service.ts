import { MEAT_API } from './../app.api';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from "./restaurant/restaurant.model"
import { Observable } from 'rxjs/Observable';
import { MenuItem } from './restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {
    }

    //Método chamado apenas quando alguém se escrever (subscribe)
    restaurants(search?: string): Observable<Restaurant[]> {
        let params: HttpParams = undefined;
        if(search){
            params = new HttpParams().set('q',search)//O HttpParams é imutável e precisa ser chamado na mesma linha pois ele sempre retorna uma instancia nova no HttpParams
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params});// o parametro q é de suporte do json-server para realizar a bsuca em qualquer atributo
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    }
}