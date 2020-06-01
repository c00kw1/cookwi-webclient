import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {


    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isAuthenticated$;
    }

    public isLoggedIn: Observable<boolean>;
    public login(): void { this.authService.login(); }
    public logout(): void { this.authService.logout(); }
    public refresh(): void { this.authService.refresh(); }
    public isAdmin(): boolean { return this.authService.isAdmin(); }
    
    get user_identity(): string {
        return this.authService.identityClaims
            ? `${this.authService.identityClaims['given_name']} ${this.authService.identityClaims['family_name']}`
            : '-';
    }

}
