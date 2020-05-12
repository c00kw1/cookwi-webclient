import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from 'src/app/core/services/auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from 'src/app/not-found.component';

const secondaryRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
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
