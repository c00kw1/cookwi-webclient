import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-should-login',
    template: `<div class="page-title mat-elevation-z0">
                    <h1>Vous devez vous authentifier</h1>
               </div>`
})
export class ShouldLoginComponent {
    constructor(private authService: OAuthService) { }

    public login($event) {
        $event.preventDefault();
        this.authService.initImplicitFlow();
    }
}
