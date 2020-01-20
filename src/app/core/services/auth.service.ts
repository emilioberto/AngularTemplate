import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseHttpService } from '@app/core/services/base-http.service';
import { BaseService } from '@app/core/services/base.service';
import { CredentialsData, TokenResponse } from '@app/shared/models/authentication';

@Injectable()
export class AuthService extends BaseService {

  public constructor(http: BaseHttpService) {
    super(http, 'auth');
  }

  public authenticate(credentials: CredentialsData): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiPath}/login`, credentials);
  }
}
