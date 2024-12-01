import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFaqsComponent } from '../add-faqs/add-faqs.component';

@Component({
  selector: 'app-faqsapi',
  templateUrl: './faqsapi.component.html',
  styleUrls: ['./faqsapi.component.css']
})
export class FaqsapiComponent implements OnInit {
  panelOpenState = false;
  faqs: any;
  pageId: any;
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pageId = data?.page;
    this.getFaq(this.pageId);
  }

  ngOnInit(): void {
  }

  getFaq(page) {
    this.http.post('http://localhost:8080/faqs/faq', { page: page }).subscribe((resp: any) => {
      console.log(resp);
      this.faqs = resp?.faqs?.[0];

    })
  }

  addFaqs() {
    // this.router.navigate(['/addfaqs']);
    this.dialog.open(AddFaqsComponent, {
      width: '800px',
      disableClose: true
    });
  }

}
