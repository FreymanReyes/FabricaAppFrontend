import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { Route, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';






const ruta: Route [] = [
  {
    path:'',
    component: OrdersComponent
  }
]

@NgModule({
  declarations: [
    OrdersComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ruta),
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class OrdersModule { }
