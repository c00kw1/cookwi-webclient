import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthAdminGuard implements CanActivate {
    private isAuthenticated: boolean;

    constructor(
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.authService.isDoneLoading$
            .pipe(filter(isDone => isDone))
            .pipe(map(_ => this.isAuthenticated && this.authService.isAdmin()))
            .pipe(tap(result => {
                if (!result) {
                    this.router.navigate(['home']).then(() => {
                        this.snackBar.open("Only admin users have access to that.", "Close", { duration: 5_000, verticalPosition: 'top' });
                    });
                }
            }));
    }
}