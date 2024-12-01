import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userUpdateForm:any;
  userId:any;
  userData:any;
  constructor(private userService: UsersService, private _snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UpdateuserComponent>,
    private spinner: NgxSpinnerService,  ) { 
      this.userId = data?.id;
      console.log(data);
      this.userData = data;
    }

  ngOnInit(): void {
    this.userUpdateForm = new FormGroup({
      userRole: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      centerName: new FormControl('', [Validators.required]), 
      pageUrl: new FormControl('', [Validators.required])
    });
    this.patchValue();
  }

  patchValue(){
    console.log(this.userData);
    this.userUpdateForm.patchValue({
      userRole: this.userData?.role,
      city: this.userData?.city,
      centerName: this.userData?.centerName,
      pageUrl: this.userData?.pageUrl
    });
  }

  updateUser(){
    this.spinner.show();
    let body = {
      userId: this.userId,
      role: this.userUpdateForm?.value?.userRole,
      city: this.userUpdateForm?.value?.city,
      centerName: this.userUpdateForm?.value?.centerName,
      pageUrl: this.userUpdateForm?.value?.pageUrl
    }
    console.log(body)
    this.userService.updateUser(body).subscribe((resp:any)=>{
      console.log(resp);
      this.dialogRef.close();
      this.spinner.hide();
      this._snackBar.open(resp?.message, 'OK', {
        duration: 5000,
        verticalPosition: this.verticalPosition
      });
    }, (err) => {
      this.spinner.hide();
    })
  }

}
