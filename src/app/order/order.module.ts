import { LeaveOrderGuard } from 'app/order/leave-order.guard';
import { SharedModule } from './../shared/shared.module';
import { OrderComponent } from './order.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { NgModule } from "@angular/core";
import { OrderItemsComponent } from './order-items/order-items.component';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
    {path:'', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    declarations: [
        DeliveryCostsComponent,
        OrderItemsComponent,
        OrderComponent
    ],
    imports: [
        SharedModule, //Já importa os modulos importados no outro arquivo
        RouterModule.forChild(ROUTES)
    ]
})
export class OrderModule {

}