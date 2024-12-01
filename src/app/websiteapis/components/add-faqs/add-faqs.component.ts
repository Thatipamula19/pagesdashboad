import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqsService } from '../../services/faqs.service';
@Component({
  selector: 'app-add-faqs',
  templateUrl: './add-faqs.component.html',
  styleUrls: ['./add-faqs.component.css']
})
export class AddFaqsComponent implements OnInit {

  faqsForm: any;
  editpage: boolean = false;
  pageId: any;
  faqData: any;
  constructor(private fb: FormBuilder, private faqService: FaqsService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddFaqsComponent>) {
    this.pageId = data?.page;
    console.log(this.pageId);
    if (this.pageId) {
      this.editpage = true;
      this.getFaq(this.pageId);
    } else {
      this.editpage = false;
    }
  }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.faqsForm = new FormGroup({
      page: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z]*$')]),
      faqs: this.fb.array([])
    })
  }

  faqs(): FormArray {
    return this.faqsForm.get("faqs") as FormArray
  }
  newFaq(): FormGroup {
    return this.fb.group({
      quation: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required])
    });
  }

  addFaq() {
    this.faqs().push(this.newFaq());
  }

  removeFaq(faqIndex) {
    this.faqs().removeAt(faqIndex);
  }

  Submit() {
    let body = {
      page: this.faqsForm.value.page,
      faqs: this.faqsForm.value.faqs
    }
    console.log(body, 'body')
    console.log(this.faqsForm)
    if (this.editpage) {
      this.faqService.updateFaqs(body).subscribe(resp => {
        console.log(resp);
        this.dialogRef.close();
      })
    } else {
      this.faqService.addFaqs(body).subscribe(resp => {
        console.log(resp);
        this.dialogRef.close();
      })
    }
  }

  getFaq(page) {
    this.faqService.getFaq(page).subscribe((resp: any) => {
      console.log(resp);
      this.faqData = resp?.faqs?.[0];
      this.patchValue();
    })
  }

  patchValue() {
    this.faqsForm.patchValue({
      page: this.faqData?.page,
    });
    this.faqData?.faqs?.map(faq => {
      let fq = this.fb.group({
        quation: this.fb.control(faq?.quation),
        answer: this.fb.control(faq?.answer),
      });
      this.faqs().push(fq);
    });
    console.log(this.faqsForm.value)

  }
}
