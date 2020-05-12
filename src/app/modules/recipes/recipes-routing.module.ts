import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { RecipesCreateComponent } from './pages/recipes-create/recipes-create.component';
import { AuthGuard } from 'src/app/core/services/auth/auth.guard';

const secondaryRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: RecipesListComponent, canActivate: [AuthGuard] },
    { path: 'create', component: RecipesCreateComponent, canActivate: [AuthGuard] }
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
export class RecipesRoutingModule { }
