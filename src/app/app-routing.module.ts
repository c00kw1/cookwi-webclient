import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { ShouldLoginComponent } from './should-login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreventLoggedInAccessGuard } from './core/services/auth/preventLoggedInAccess.guard';
import { LoginComponent } from './pages/login/login.component';
import { LegalComponent } from './pages/legal/legal.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'register/:id',
    component: RegisterComponent,
    canActivate: [PreventLoggedInAccessGuard],
  },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLoggedInAccessGuard],
  },
  { path: 'should-login', component: ShouldLoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
