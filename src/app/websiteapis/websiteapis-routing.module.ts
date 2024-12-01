import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPagesComponent } from './components/view-pages/view-pages.component';
import { AuthGuard } from '../users/guards/auth.guard';
import { AddPageComponent } from './components/add-page/add-page.component';
import { ViewallPagesComponent } from './components/viewall-pages/viewall-pages.component';
import { ViewsinglePageComponent } from './components/viewsingle-page/viewsingle-page.component';

const routes: Routes = [
  {path: 'faqs', component: ViewPagesComponent, canActivate:[AuthGuard]},
  {path: 'add-page', component: AddPageComponent, canActivate:[AuthGuard]},
  {path: 'all-pages', component: ViewallPagesComponent, canActivate:[AuthGuard]},
  {path: 'view-single-page', component: ViewsinglePageComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteapisRoutingModule { }
