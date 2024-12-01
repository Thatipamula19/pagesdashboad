import { Component, Injectable, ViewChild } from '@angular/core';
import { AuthService } from './users/services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMenuOpen: boolean = false;
  isAuthentiated:boolean = false;
  @ViewChild('snav') snav;
  constructor(private auth: AuthService){
    this.auth.isAuth.subscribe((auth)=>{
      this.isAuthentiated = auth;
    });
  }

  menuOpen(){
    this.snav.toggle();
  }
  title = 'dashboard';
}
