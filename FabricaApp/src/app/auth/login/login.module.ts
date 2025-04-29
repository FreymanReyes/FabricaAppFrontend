import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Route, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import { ToastrModule } from 'ngx-toastr';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatToolbarModule} from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




const ruta: Route [] = [
  {
    path:'',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(ruta),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatToolbarModule

    
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
