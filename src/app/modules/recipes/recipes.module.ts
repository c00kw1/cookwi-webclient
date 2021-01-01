import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './pages/recipes-list/recipes-list.component';
import { RecipesGridComponent } from './components/recipes-grid/recipes-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesEditComponent } from './pages/recipes-edit/recipes-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    RecipesListComponent,
    RecipesGridComponent,
    RecipesEditComponent,
    RecipeViewComponent,
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    DragDropModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class RecipesModule {}
