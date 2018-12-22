import { ErrorHandler } from './../app.error-handler';
import { MEAT_API } from './../app.api';
import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from "./restaurant/restaurant.model"
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) {
    }

    //Método chamado apenas quando alguém se escrever (subscribe)
    restaurants(): Observable<Restaurant[]> {
        //O mapeamento é preciso pois o retorno Observable<response> retorna muita informação, por exemplo: O status code
        //Catch: sempre que um erro acontece, o Observable é fechado - é possível criar um outro observable retornando um erro ou outro tratamento
        return this.http.get(`${MEAT_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }
}