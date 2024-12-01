import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // apiUrl ='http://localhost:8080/pages/';
  apiUrl = 'https://pagesbackend.onrender.com/';
  constructor(private http: HttpClient) { }


  addUser(body){
    return this.http.post(`$${this.apiUrl}user/add`, body);
  }

  userLogin(body){
    return this.http.post(`${this.apiUrl}user/login`, body);
  }

  getUsers(){
    return this.http.get(`${this.apiUrl}user`);
  }

  updateUser(body){
    return this.http.post(`${this.apiUrl}user/update`, body);
  }

  deleteUser(body){
    return this.http.post(`${this.apiUrl}user/delete`, body);
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem('userDetails') || "");
  }
}
