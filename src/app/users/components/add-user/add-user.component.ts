import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userRegistrationForm:any;
  constructor(private userService: UsersService, private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<AddUserComponent>, private spinner: NgxSpinnerService,    ) { }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm(){
    this.userRegistrationForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required),
      team: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      centerName: new FormControl('', [Validators.required]),
      pageUrl: new FormControl('', [Validators.required])
    })
  }
  Submit(){
    this.spinner.show();
    console.log(this.userRegistrationForm.value);
    let body = {
      fullname: this.userRegistrationForm.value.fullname,
      email: this.userRegistrationForm.value.email,
      password: this.userRegistrationForm.value.password,
      team: this.userRegistrationForm.value.team,
      city: this.userRegistrationForm.value.city,
      centerName: this.userRegistrationForm.value.centerName,
      pageUrl: this.userRegistrationForm.value.pageUrl
    }
    if(this.userRegistrationForm.value.password == this.userRegistrationForm.value.confirmPassword){
      this.userService.addUser(body).subscribe((resp:any)=>{
        console.log(resp);
        this.spinner.hide();
        this._snackBar.open(resp?.message, 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
        this.dialogRef.close();
      },
      error =>{
        console.log(error);
        this.spinner.hide();
        this._snackBar.open(error?.error?.message, 'OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      });
    } else {
      this._snackBar.open('password and confirm password not matched', 'OK', {
        duration: 5000,
        verticalPosition: this.verticalPosition
      });
    }
  }
}
