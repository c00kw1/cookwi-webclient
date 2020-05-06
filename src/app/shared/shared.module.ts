import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RecipesSearchPipe } from './pipes/recipes-search.pipe';
import { TagsFilterPipe } from './pipes/tags-filter.pipe';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [TopbarComponent, RecipesSearchPipe, TagsFilterPipe],
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatIconModule, MatButtonModule
  ],
  exports: [TopbarComponent, RecipesSearchPipe, TagsFilterPipe]
})
export class SharedModule { }
