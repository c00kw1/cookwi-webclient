import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ReceipesListComponent } from './components/receipes-list/receipes-list.component';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [RecipesComponent, ReceipesListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
