import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import {
  OAuthModule,
  OAuthStorage,
  AuthConfig,
  OAuthModuleConfig,
} from 'angular-oauth2-oidc';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { authCodeFlowConfig } from './services/auth/auth-config';
import { authModuleConfig } from './services/auth/auth-module-config';
import { RecipesService } from './services/recipes.service';
import { PreventLoggedInAccessGuard } from './services/auth/preventLoggedInAccess.guard';
import { UsersService } from './services/users.service';
import { AuthAdminGuard } from './services/auth/auth.admin.guard';
import { AdminUsersService } from './services/admin/admin.users.service';
import { AdminRecipesService } from './services/admin/admin.recipes.service';
import { ContactService } from './services/contact.service';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    SharedModule,
  ],
  providers: [
    RecipesService,
    AuthService,
    AuthGuard,
    AuthAdminGuard,
    PreventLoggedInAccessGuard,
    UsersService,
    AdminUsersService,
    AdminRecipesService,
    ContactService,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: AuthConfig, useValue: authCodeFlowConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
