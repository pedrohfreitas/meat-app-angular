import { MEAT_API } from './../app.api';
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'

import { Restaurant } from "./restaurant/restaurant.model"
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) {
    }

    restaurants(): Observable<Restaurant[]> {
        //O mapeamento é preciso pois o retorno Observable<response> retorna muita informação, por exemplo: O status code
        return this.http.get(`${MEAT_API}/restaurants`).map(response => response.json());
    }
}