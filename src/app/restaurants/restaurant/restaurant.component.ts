import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  //Isso é importante para um component parent poder enviar informações para este component
  //Recebe dados
  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
