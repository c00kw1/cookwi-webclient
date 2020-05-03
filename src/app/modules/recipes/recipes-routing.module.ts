import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';

const secondaryRoutes: Routes = [
    { path: 'recipes', component: RecipesComponent }
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
