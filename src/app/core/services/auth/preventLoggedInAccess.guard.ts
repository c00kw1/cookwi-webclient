import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class PreventLoggedInAccessGuard implements CanActivate {
    private isAuthenticated: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.authService.isDoneLoading$
            .pipe(filter(isDone => isDone))
            .pipe(map(_ => {
                if (this.isAuthenticated)
                {
                    this.router.navigate(["home"]);
                }
                return !this.isAuthenticated
            }));
    }
}