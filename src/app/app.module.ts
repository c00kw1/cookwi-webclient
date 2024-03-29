import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found.component';
import { ShouldLoginComponent } from './should-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LegalComponent } from './pages/legal/legal.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MatDividerModule } from '@angular/material/divider';
import { HistoryComponent } from './pages/history/history.component';
import { MatSelectModule } from '@angular/material/select';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    AppComponent,
    NotFoundComponent,
    ShouldLoginComponent,
    LoginComponent,
    LegalComponent,
    HistoryComponent,
    ContactComponent,
  ],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
