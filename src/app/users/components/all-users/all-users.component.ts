import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  users:any;
  displayedColumns: string[] = ['fullname', 'email', 'role', 'team', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UsersService, private dialog: MatDialog, private _snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((resp:any)=>{
      console.log(resp);
      this.users = new MatTableDataSource<user>(resp?.users);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
      console.log(this.users)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }


  updateUser(data){
    console.log(data);
    let dialogRef = this.dialog.open(UpdateuserComponent, {
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        window.location.reload();
      }, 1500)
    });

  }

  deleteUser(id){
  let body =  {
      userId: id
    }
  this.userService.deleteUser(body).subscribe((resp:any)=>{
    console.log(resp);
    this._snackBar.open(resp?.message, 'OK', {
      duration: 5000,
      verticalPosition: this.verticalPosition
    });
  })
  }

  newUser(){
    this.dialog.open(AddUserComponent,{
     width:'400px',
    });
   }

}

export interface user {
  fullname: string;
  email: number;
  role: number;
  team: string;
}
