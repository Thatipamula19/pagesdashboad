import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomedashboardComponent } from './components/welcomedashboard/welcomedashboard.component';
import { AuthGuard } from '../users/guards/auth.guard';

const routes: Routes = [
  {path:'dashboard', component: WelcomedashboardComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
