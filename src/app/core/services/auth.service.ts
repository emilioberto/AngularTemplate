import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseHttpService } from '@app/core/services/base-http.service';
import { BaseService } from '@app/core/services/base.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { SettingsService } from '@app/core/services/settings.service';
import { CredentialsData, TokenResponse } from '@app/shared/models/authentication';

@Injectable()
export class AuthService extends BaseService {

  public constructor(
    protected http: BaseHttpService,
    private settingsSvc: SettingsService,
    private navigationSvc: NavigationService
  ) {
    super(http, 'auth');
  }

  public authenticate(credentials: CredentialsData): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiPath}/login`, credentials);
  }

  public logout(): void {
    this.settingsSvc.clear();
    this.navigationSvc.login();
  }
}
