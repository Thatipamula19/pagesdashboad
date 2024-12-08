import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  // apiUrl ='http://localhost:8080/';
  apiUrl = 'https://pagesbackend.onrender.com/';
  constructor(private http: HttpClient) { }


  getFaqs(){
  return this.http.get(`${this.apiUrl}faqs`);
  }

  addFaqs(body){
    return this.http.post(`${this.apiUrl}faqs/add`, body);
  }

  updateFaqs(body){
    return this.http.post(`${this.apiUrl}faqs/update`, body)
  }

  getFaq(page){
    return this.http.post(`${this.apiUrl}faqs/faq`, { page: page })
  }

  deleteFaq(page){
    return this.http.post(`${this.apiUrl}faqs/delete`, { page: page })
  }
}
