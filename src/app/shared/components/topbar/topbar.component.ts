import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  environment: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated$;
    this.environment = environment;
  }

  public isLoggedIn: Observable<boolean>;
  public login(): void {
    this.authService.login();
  }
  public logout(): void {
    this.authService.logout();
  }
  public refresh(): void {
    this.authService.refresh();
  }
  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get user_identity(): string {
    return this.authService.identityClaims
      ? `${this.authService.identityClaims['given_name']} ${this.authService.identityClaims['family_name']}`
      : '-';
  }
}
