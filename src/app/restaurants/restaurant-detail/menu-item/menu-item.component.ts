import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations:[
    trigger('menuItemAppeared', [
      state('ready', style({ opacity: 1})),
      transition('void => ready', [ //void é um momento onde o compoenente não existe ainda na arvore de componentes
          style({opacity: 0, transform: 'translateY(-20px)'}),//o translate com o -30px ele começa em -30px e vai até zero, o mesmo acontece com o -10px
          animate('300ms 0s ease-in')//entra acelerando a aniamção e termina desacelerando
      ])
    ])

  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = "ready";

  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  //O component parent pode assicionar uma associação e tratar isso
  emitAddEvent() {
    console.log(" 2 ",this.menuItem)
    this.add.emit(this.menuItem);
  }

}
