import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';
import { AuthQuery } from '@app/core/state-management/auth.query';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authQuery: AuthQuery,
    private authSvc: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.ensureIsAuthenticated();
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.ensureIsAuthenticated();
  }

  ensureIsAuthenticated(): Observable<boolean> { // TODO: Check authentication with server
    return this.authQuery.isLoggedIn$
      .pipe(
        take(1),
        switchMap((isLoggedIn) => {
          if (!isLoggedIn) {
            this.authSvc.logout();
          }
          return of(isLoggedIn);
        })
      );
  }
}
