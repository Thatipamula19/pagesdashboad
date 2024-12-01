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
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {


  pageForm: any;
  editPage: boolean = false;
  pageId: any;
  pageData: any;
  constructor(private fb: FormBuilder, private pageService: PageService, private activeRoute: ActivatedRoute, private router: Router) {
    console.log(this.activeRoute.snapshot.queryParams);
    let data = this.activeRoute.snapshot.queryParams;
    this.pageId = data?.page;
    console.log(this.pageId);
    if (this.pageId) {
      this.editPage = true;
      this.getPage(this.pageId);
    } else {
      this.editPage = false;
    }
  }

  ngOnInit(): void {
    this.initiateForm();
  }

  initiateForm() {
    this.pageForm = new FormGroup({
      page: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z]*$')]),
      pageUrl: new FormControl('', [Validators.required]),
      faqs: this.fb.array([]),
      banners: this.fb.array([]),
      keyFeatures: this.fb.array([])
    })
  }

  Submit() {
    let body = {
      page: this.pageForm.value.page,
      pageUrl: this.pageForm.value.pageUrl,
      banners: this.pageForm.value.banners,
      keyFeatures: this.pageForm.value.keyFeatures,
      faqs: this.pageForm.value.faqs
    }
    console.log(body, 'body')
    console.log(this.pageForm)
    if (this.editPage) {
      this.pageService.updatePage(body).subscribe(resp => {
        console.log(resp);
        this.router.navigate([`/view-single-page`], { queryParams: { page: this.pageForm.value.pageUrl } });
      })
    } else {
      this.pageService.addPage(body).subscribe(resp => {
        console.log(resp);
        this.router.navigate([`/view-single-page`], { queryParams: { page: this.pageForm.value.pageUrl } });
      })
    }
  }

  getPage(page) {
    this.pageService.getPage(page).subscribe((resp: any) => {
      console.log(resp);
      this.pageData = resp?.data?.[0];
      this.patchValue();
    })
  }

 async patchValue() {
    console.log(this.pageData);
   await this.pageForm.patchValue({
      page: this.pageData?.page,
      pageUrl: this.pageData?.pageUrl
    });
  await  this.pageData?.faqs?.map(faq => {
      let fqNew = this.fb.group({
        question: this.fb.control(faq?.question),
        answer: this.fb.control(faq?.answer),
      });
      this.faqs().push(fqNew);
    });
  await  this.pageData?.banners?.map(banner => {
      let bannerNew = this.fb.group({
        imageWeb: this.fb.control(banner?.imageWeb),
        imageMob: this.fb.control(banner?.imageMob),
      });
      this.banners().push(bannerNew);
    });
    this.pageData?.keyFeatures?.map(future => {
      let futureNew = this.fb.group({
        image: this.fb.control(future?.image),
        heading: this.fb.control(future?.heading),
        description: this.fb.control(future?.description),
      });
      this.keyFeatures().push(futureNew);
    });
    console.log(this.pageForm.value)

  }


  faqs(): FormArray {
    return this.pageForm.get("faqs") as FormArray
  }
  newFaq(): FormGroup {
    return this.fb.group({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required])
    });
  }

  addFaq() {
    this.faqs().push(this.newFaq());
  }

  removeFaq(faqIndex) {
    this.faqs().removeAt(faqIndex);
  }



  banners(): FormArray {
    return this.pageForm.get("banners") as FormArray
  }
  newBanner(): FormGroup {
    return this.fb.group({
      imageWeb: new FormControl('', [Validators.required]),
      imageMob: new FormControl('', [Validators.required])
    });
  }

  addBanner() {
    this.banners().push(this.newBanner());
  }

  removeBanner(index) {
    this.banners().removeAt(index);
  }


  keyFeatures(): FormArray {
    return this.pageForm.get("keyFeatures") as FormArray
  }
  newKeyFeature(): FormGroup {
    return this.fb.group({
      image: new FormControl('', [Validators.required]),
      heading: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  addKeyFeature() {
    this.keyFeatures().push(this.newKeyFeature());
  }

  removeKeyFeature(index) {
    this.keyFeatures().removeAt(index);
  }

}
