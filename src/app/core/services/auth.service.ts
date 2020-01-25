import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseHttpService } from '@app/core/services/base-http.service';
import { BaseService } from '@app/core/services/base.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { AuthStore } from '@app/core/state/auth.store';
import { CredentialsData, TokenResponse } from '@app/shared/models/authentication';
import { handleLoading } from '@app/shared/rxjs/handle-loading';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    protected http: BaseHttpService,
    private authStore: AuthStore,
    private navigationSvc: NavigationService
  ) {
    super(http, 'auth');
  }

  authenticate(credentials: CredentialsData): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiPath}/login`, credentials)
      .pipe(
        tap(res => {
          this.authStore.login(res);
          this.navigationSvc.home();
        }),
        handleLoading(this.authStore)
      );
  }

  logout(): void {
    this.authStore.logout();
    this.navigationSvc.login();
  }
}
