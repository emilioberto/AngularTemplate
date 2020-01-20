import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { AuthService } from '@app/core/services/auth.service';
import { SettingsService } from '@app/core/services/settings.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private authSvc: AuthService,
    private settingsSvc: SettingsService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.ensureIsAuthenticated();
  }

  public canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.ensureIsAuthenticated();
  }

  public ensureIsAuthenticated(): boolean { // TODO: Check authentication with server
    const isAuthenticated = !isNullOrUndefined(this.settingsSvc.token);
    if (!isAuthenticated) {
      this.authSvc.logout();
    }
    return isAuthenticated;
  }
}
