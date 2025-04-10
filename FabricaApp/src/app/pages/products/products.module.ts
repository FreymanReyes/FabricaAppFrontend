import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { Route, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';



const ruta: Route [] = [
  {
    path:'',
    component: ProductsComponent
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ruta),
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ProductsModule { }
