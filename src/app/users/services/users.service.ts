import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // apiUrl ='http://localhost:8080/';
  apiUrl = 'https://pagesbackend.onrender.com/';
  constructor(private http: HttpClient) { }

  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };  

  addUser(body){
    return this.http.post(`$${this.apiUrl}user/add`, body, {headers: this.headers});
  }

  userLogin(body){
    return this.http.post(`${this.apiUrl}user/login`, body, {headers: this.headers});
  }

  getUsers(){
    return this.http.get(`${this.apiUrl}user`, {headers: this.headers});
  }

  updateUser(body){
    return this.http.post(`${this.apiUrl}user/update`, body, {headers: this.headers});
  }

  deleteUser(body){
    return this.http.post(`${this.apiUrl}user/delete`, body, {headers: this.headers});
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem('userDetails') || "");
  }
}
