import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { RecipesCreateComponent } from './pages/recipes-create/recipes-create.component';

const secondaryRoutes: Routes = [
    { path: 'recipes', redirectTo: 'recipes/list', pathMatch: 'full' },
    { path: 'recipes/list', component: RecipesListComponent },
    { path: 'recipes/create', component: RecipesCreateComponent }
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
