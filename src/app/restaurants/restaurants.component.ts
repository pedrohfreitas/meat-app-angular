import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { style, state, trigger, transition, animate } from '@angular/animations';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'
import {Observable} from 'rxjs/observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({ opacity: 0, "max-height": "0px" })),
      state('visible', style({ opacity: 1, "max-height": "70px", "margin-top": "20px" })),
      transition('* => *', animate('200ms 0s ease-in-out'))
    ])
  ] 
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  searchForm: FormGroup;
  searchControl: FormControl;

  restaurants: Restaurant[];

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  //É chamado uma vez no ciclo de vida do componente, após a injeção de dependencia ser atribuida dentro do component
  ngOnInit() {
    //após a chamada http ser realizada, o map é acionado para mapear o retorno da api em um objeto. 
    //A chamada para api é realizada quando o objeto subscribe é acionado
    //Após o mapeamento ser realizado, é chamada a função arrow que recebe o json mapeamento e atribuí isto a uma variavel do componenet
    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants);

    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    }); 
 
    this.searchControl.valueChanges 
        .debounceTime(400)//Aguarda este tempo entre o intervalo dos eventos
        .distinctUntilChanged()//Só evite um evento se realmente houver alteração no texto
        .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)//o swithmap tem uma função, além do mapeamento, de fazer o unscribe de eventos anteriores para não "encavalar"
          .catch(error => Observable.from([])))//tratamento para não quebrar o observable da busca
        .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
