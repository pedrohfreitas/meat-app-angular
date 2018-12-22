import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantsService: RestaurantsService) { }

  //É chamado uma vez no ciclo de vida do componente, após a injeção de dependencia ser atribuida dentro do component
  ngOnInit() {
    //após a chamada http ser realizada, o map é acionado para mapear o retorno da api em um objeto. 
    //A chamada para api é realizada quando o objeto subscribe é acionado
    //Após o mapeamento ser realizado, é chamada a função arrow que recebe o json mapeamento e atribuí isto a uma variavel do componenet
    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

}
