import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const secondaryRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(secondaryRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class HomeRoutingModule { }
