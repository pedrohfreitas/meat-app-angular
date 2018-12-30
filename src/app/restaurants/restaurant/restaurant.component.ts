import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './restaurant.model';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({ opacity: 1})),
      transition('void => ready', [ //void é um momento onde o compoenente não existe ainda na arvore de componentes
          style({opacity: 0, transform: 'translate(-30px,-10px)'}),//o translate com o -30px ele começa em -30px e vai até zero, o mesmo acontece com o -10px
          animate('300ms 0s ease-in-out')//entra acelerando a aniamção e termina desacelerando
      ])
    ])
  ]

})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready';

  //Isso é importante para um component parent poder enviar informações para este component
  //Recebe dados
  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
