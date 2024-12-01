import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/services/auth.service';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.css']
})
export class MatToolbarComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userDetails:any;
  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
  }

  logout(){
    this.router.navigate(['/']);
    this.authService.updateAuthStatus(false);
    localStorage.clear();
    this._snackBar.open('User Logout successfully', 'OK', {
      duration: 5000,
      verticalPosition: this.verticalPosition
    });
  }

}
