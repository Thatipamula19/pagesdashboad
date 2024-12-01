import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteapisRoutingModule } from './websiteapis-routing.module';
import { FaqsapiComponent } from './components/faqsapi/faqsapi.component';
import { AddFaqsComponent } from './components/add-faqs/add-faqs.component';
import { MaterialModule } from '../module/material/material.modult';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPagesComponent } from './components/view-pages/view-pages.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { ViewallPagesComponent } from './components/viewall-pages/viewall-pages.component';
import { ViewsinglePageComponent } from './components/viewsingle-page/viewsingle-page.component';


@NgModule({
  declarations: [
    FaqsapiComponent,
    AddFaqsComponent,
    ViewPagesComponent,
    AddPageComponent,
    ViewallPagesComponent,
    ViewsinglePageComponent
  ],
  imports: [
    CommonModule,
    WebsiteapisRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class WebsiteapisModule { }
