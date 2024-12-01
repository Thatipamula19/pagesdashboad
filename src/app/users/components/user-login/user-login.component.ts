import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginForm:any;
  constructor(private userService: UsersService, private _snackBar: MatSnackBar, private router: Router,
  private dialog: MatDialog, private spinner: NgxSpinnerService,  ) { }

  ngOnInit(): void {
    this.initiateForm();

    const token: any = localStorage.getItem('token');
    if(token){
      console.log(token);
      this.router.navigate(['/dashboard']);
      return;
    }
  }

  initiateForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  Submit(){
    this.spinner.show();
    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.userService.userLogin(body).subscribe((resp:any)=>{
      console.log(resp);
      if(resp?.userDetails?.role == 'NewUser'){
        this.spinner.hide();
        this._snackBar.open(`You don't have access to dashborad Please Contact Adimin for Access`, 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      } else {
        this._snackBar.open(resp?.message, 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
        localStorage.setItem('token', resp.token);
        localStorage.setItem('userDetails', JSON.stringify(resp?.userDetails));
        this.spinner.hide();
        if(resp?.userDetails?.role == 'Admin'){
          this.router.navigate(['/all-pages']);
        } else {
          this.router.navigate([`/view-single-page`], { queryParams: { page: resp?.userDetails?.pageUrl } });
        }
      }
    
    },
    error =>{
      console.log(error);
      this.spinner.hide();
      this._snackBar.open(error?.error?.message, 'OK', {
        duration: 5000,
        verticalPosition: this.verticalPosition
      });
    }
    )
  }

  newUser(){
   this.dialog.open(AddUserComponent,{
    width:'400px',
   });
  }

}
