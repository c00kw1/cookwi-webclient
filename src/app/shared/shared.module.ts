import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import {
  RecaptchaV3Module,
  RecaptchaFormsModule,
  RECAPTCHA_V3_SITE_KEY,
} from 'ng-recaptcha';

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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
    RecaptchaV3Module,
    RecaptchaFormsModule,
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
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6Ldli2oaAAAAAPBY5lZqe2P2uVg2DEuIoh1_M5y0',
    },
  ],
})
export class SharedModule {}
