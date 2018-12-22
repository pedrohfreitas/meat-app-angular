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
    this.restaurants = this.restaurantsService.restaurants();
  }

}
