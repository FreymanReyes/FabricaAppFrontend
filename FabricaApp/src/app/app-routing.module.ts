import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ProductsModule } from './pages/products/products.module';
import { LoginGuard } from './guard/login.guard';
import { LayoutGuard } from './guard/layout.guard';


export const routes: Route[] = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [LoginGuard],
    children:[
      {
        path: 'products',
        loadChildren: () => import('src/app/pages/products/products.module').then(m=>m.ProductsModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('src/app/pages/orders/orders.module').then(m=>m.OrdersModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LayoutGuard],

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LayoutGuard],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
