import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

      
      const token:any = sessionStorage.getItem('token');

      return new Promise<boolean>((resolve, reject) => {
        if(token){        
          resolve(true);
        }else{
          this.router.navigate(['/login']);
          resolve(false);
        }
      })
  }
  
}
