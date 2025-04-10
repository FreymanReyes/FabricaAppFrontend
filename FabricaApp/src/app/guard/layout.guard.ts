import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutGuard implements CanActivate {

  constructor (private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token:any = sessionStorage.getItem('token');

      return new Promise<boolean>((resolve, reject) => {
        if(!token){
          resolve(true);
        }else{
          this.router.navigate(['/products']);
          resolve(false);
        }
      })

  }
  
}
