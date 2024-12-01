import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: BehaviorSubject<any>;

  isAdmin:boolean = false;
  isMarketing:boolean = false;

  constructor() { 
    this.isAuth = new BehaviorSubject('');

    if (localStorage.getItem('token')) {
      this.isAuth.next(true);
    } else {
      this.isAuth.next(false);
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  updateAuthStatus(status: boolean): void {
    this.isAuth.next(status);
  }

  isAdminCheck(){
    const userDetails:any = JSON.parse(localStorage.getItem('userDetails') || '');
    if(userDetails.role == 'Admin'){
      return this.isAdmin = true;
    } else {
      return this.isAdmin = false;
    }
  }

  isMarketingCheck(){
    const userDetails:any = JSON.parse(localStorage.getItem('userDetails') || '');
    if(userDetails.role == 'Marketing'){
      return this.isMarketing = true;
    } else {
      return this.isMarketing = false;
    }
  }
}
