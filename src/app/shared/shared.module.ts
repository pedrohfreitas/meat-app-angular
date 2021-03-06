import { AuthInterceptor } from './../security/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { ShoppingCartService } from 'app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { LoginService } from 'app/security/login/login.service';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { LeaveOrderGuard } from 'app/order/leave-order.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http'

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [InputComponent, SnackbarComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {

    //Função que retorna os Modulos e Serviços
    //Isso possibilidade que o sharemodule possa retornar apenas os modulos, quando chamado normalmente
    // ou retorna a lista de provides quando chamando utilizando o forRoot
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService,
                OrderService, 
                RestaurantsService, 
                LoginService, 
                NotificationService, 
                LoggedInGuard, 
                LeaveOrderGuard,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}//multi siginifa que ele irá entrar na lista de todos os intercepetors
            ]
        }
    }

}