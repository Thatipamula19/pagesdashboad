import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageApi ='http://localhost:8080/pages/';

  constructor(private http: HttpClient) { }


  getPages(){
  return this.http.get(this.pageApi);
  }

  addPage(body){
    return this.http.post(`${this.pageApi}addPage`, body);
  }

  updatePage(body){
    return this.http.post(`${this.pageApi}updatePage`, body)
  }

  getPage(page){
    return this.http.post(`${this.pageApi}page`, { pageUrl: page })
  }

  deletePage(page){
    return this.http.post(`${this.pageApi}deletePage`, { pageUrl: page })
  }
}
