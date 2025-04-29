import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        LoginModule,
        RegisterModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        LayoutModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
