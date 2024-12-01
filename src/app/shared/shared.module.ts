import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from '../module/material/material.modult';
import { MatToolbarComponent } from './components/mat-toolbar/mat-toolbar.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { WelcomedashboardComponent } from './components/welcomedashboard/welcomedashboard.component';
import { WebsiteapisModule } from '../websiteapis/websiteapis.module';


@NgModule({
  declarations: [
    MatToolbarComponent,
    SidenavbarComponent,
    WelcomedashboardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    WebsiteapisModule
  ],
  exports: [
    MatToolbarComponent,
    SidenavbarComponent
  ]
})
export class SharedModule { }
