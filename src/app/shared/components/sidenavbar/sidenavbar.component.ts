import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/users/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  isAdmin:boolean=false;
  userDetails:any;
  constructor(private authService: AuthService, private router: Router, private appComp: AppComponent, private userService: UsersService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminCheck();
    this.userDetails = this.userService.getUserDetails();
    console.log(this.userDetails);
  }

  Router(route){
    this.router.navigate([`/${route}`]);
  }

  gotoPage(page){
    if(this.isAdmin){
      this.router.navigate([`/all-pages`]);
    } else {
      this.router.navigate([`/view-single-page`], { queryParams: { page: page } });
    }
  }
  menuOpen(){
    this.appComp.snav.toggle();
    this.appComp.isMenuOpen = false;
  }

}
