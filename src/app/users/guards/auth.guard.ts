import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    const token: any = localStorage.getItem('token');

    if (!token) {
      this.auth.updateAuthStatus(false);
      this.router.navigate(['/']);
      return false;
    } else {
      this.auth.updateAuthStatus(true);
      return true;
    }



  }

}
