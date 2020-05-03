import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ReceipesListComponent } from './components/receipes-list/receipes-list.component';

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

@NgModule({
    declarations: [RecipesComponent, ReceipesListComponent],
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
