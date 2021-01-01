import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RecipesSearchPipe } from './pipes/recipes-search.pipe';
import { TagsFilterPipe } from './pipes/tags-filter.pipe';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';
import { TimePipe } from './pipes/time.pipe';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

@NgModule({
  declarations: [
    TopbarComponent,
    RecipesSearchPipe,
    TagsFilterPipe,
    FooterComponent,
    TimePipe,
    SimpleDialogComponent,
    OrderByPipe,
    EnumToArrayPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    TopbarComponent,
    RecipesSearchPipe,
    TagsFilterPipe,
    FooterComponent,
    TimePipe,
    SimpleDialogComponent,
    OrderByPipe,
    EnumToArrayPipe,
  ],
})
export class SharedModule {}
