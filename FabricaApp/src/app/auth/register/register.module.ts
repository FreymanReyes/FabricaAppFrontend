import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { ToastrModule } from 'ngx-toastr';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const ruta: Route [] = [
  {
    path:'',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(ruta),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatToolbarModule
  ]
})
export class RegisterModule { }
