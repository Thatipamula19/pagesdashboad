import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  // apiUrl ='http://localhost:8080/pages/';
  apiUrl = 'https://pagesbackend.onrender.com/';

  constructor(private http: HttpClient) { }


  getPages(){
  return this.http.get(`${this.apiUrl}pages`);
  }

  addPage(body){
    return this.http.post(`${this.apiUrl}addPage`, body);
  }

  updatePage(body){
    return this.http.post(`${this.apiUrl}updatePage`, body)
  }

  getPage(page){
    return this.http.post(`${this.apiUrl}page`, { pageUrl: page })
  }

  deletePage(page){
    return this.http.post(`${this.apiUrl}deletePage`, { pageUrl: page })
  }
}
