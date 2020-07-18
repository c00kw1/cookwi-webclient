import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { RecipesCreateComponent } from './pages/recipes-create/recipes-create.component';
import { AuthGuard } from 'src/app/core/services/auth/auth.guard';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';

const secondaryRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'view/:id', component: RecipeViewComponent },
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
