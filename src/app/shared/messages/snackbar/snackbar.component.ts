import { NotificationService } from './../notification.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px',
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')), //ease-in ele irá entrar acelerando
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = ""

  snackVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  //método chamado depois que todas as dependencias estão ok
  ngOnInit() {
    //do é difierente do subscribe - 
    //subscribe ele coloca um listner no obserable e só depois 
    //disso que o observable irá notificar você.
    //O do é difernete disse, ele permite configurar uma ação logo que a mensagem chega
    this.notificationService.notifier.do(message => {
      this.message = message;
      this.snackVisibility = 'visible';
    })
    .switchMap(message => Observable.timer(3000))//swithMap troca o observables por outros observables e faz um unsubcribe se tiver algum observable ativo
    .subscribe(timer => { this.snackVisibility = 'hidden';}) 
  }
}
