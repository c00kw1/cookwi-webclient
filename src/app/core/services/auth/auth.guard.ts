import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private isAuthenticated: boolean;

    constructor(
        private authService: AuthService,
    ) {
        this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.authService.isDoneLoading$
            .pipe(filter(isDone => isDone))
            .pipe(tap(_ => this.isAuthenticated || this.authService.login()))
            .pipe(map(_ => this.isAuthenticated));
    }
}