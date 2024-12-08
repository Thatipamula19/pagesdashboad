import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  // apiUrl ='http://localhost:8080/pages/';
  apiUrl = 'https://pagesbackend.onrender.com/pages/';

  constructor(private http: HttpClient) { }

  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };  

  getPages(){
  return this.http.get(`${this.apiUrl}`, {headers: this.headers});
  }

  addPage(body){
    return this.http.post(`${this.apiUrl}addPage`, body, {headers: this.headers});
  }

  updatePage(body){
    return this.http.post(`${this.apiUrl}updatePage`, body, {headers: this.headers})
  }

  getPage(page){
    return this.http.post(`${this.apiUrl}page`, { pageUrl: page })
  }

  deletePage(page){
    return this.http.post(`${this.apiUrl}deletePage`, { pageUrl: page }, {headers: this.headers})
  }
}
