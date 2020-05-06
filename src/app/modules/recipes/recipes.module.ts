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

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesCreateComponent } from './pages/recipes-create/recipes-create.component';

@NgModule({
    declarations: [RecipesListComponent, RecipesGridComponent, RecipesCreateComponent],
    imports: [
        CommonModule,
        RecipesRoutingModule,
        FlexLayoutModule,
        MatButtonModule, MatIconModule, MatListModule,
        MatCardModule, MatInputModule, MatChipsModule,
        MatGridListModule, FormsModule, MatAutocompleteModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule
    ]
})
export class RecipesModule { }
