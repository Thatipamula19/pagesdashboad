import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  addUser(body){
    return this.http.post('http://localhost:8080/user/add', body);
  }

  userLogin(body){
    return this.http.post('http://localhost:8080/user/login', body);
  }

  getUsers(){
    return this.http.get('http://localhost:8080/user');
  }

  updateUser(body){
    return this.http.post('http://localhost:8080/user/update', body);
  }

  deleteUser(body){
    return this.http.post('http://localhost:8080/user/delete', body);
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem('userDetails') || "");
  }
}
