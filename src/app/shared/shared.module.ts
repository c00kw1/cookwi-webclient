import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { RecipesSearchPipe } from './pipes/recipes-search.pipe';
import { TagsFilterPipe } from './pipes/tags-filter.pipe';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [TopbarComponent, RecipesSearchPipe, TagsFilterPipe],
  imports: [
    CommonModule,
    MatToolbarModule, MatIconModule
  ],
  exports: [TopbarComponent, RecipesSearchPipe, TagsFilterPipe]
})
export class SharedModule { }
