import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  faqsApi ='http://localhost:8080/faqs/';

  constructor(private http: HttpClient) { }


  getFaqs(){
  return this.http.get('http://localhost:8080/faqs');
  }

  addFaqs(body){
    return this.http.post('http://localhost:8080/faqs/add', body);
  }

  updateFaqs(body){
    return this.http.post('http://localhost:8080/faqs/update', body)
  }

  getFaq(page){
    return this.http.post('http://localhost:8080/faqs/faq', { page: page })
  }

  deleteFaq(page){
    return this.http.post('http://localhost:8080/faqs/delete', { page: page })
  }
}
