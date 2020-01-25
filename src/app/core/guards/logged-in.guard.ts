import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthQuery } from '@app/core/state/auth.query';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private authQuery: AuthQuery,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.ensureIsNotAuthenticated();
  }

  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.ensureIsNotAuthenticated();
  }

  ensureIsNotAuthenticated(): Observable<boolean> {
    return this.authQuery.isLoggedIn$
      .pipe(
        take(1),
        switchMap((isLoggedIn) => {
          return of(!isLoggedIn);
        })
      );
  }
}
