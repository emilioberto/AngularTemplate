import { Store, StoreConfig } from '@datorama/akita';

import { SettingsService } from '@app/core/services/settings.service';
import { TokenResponse } from '@app/shared/models/authentication';

// tslint:disable-next-line:no-empty-interface
export interface AuthState extends TokenResponse { }

export function createInitialState(settingsSvc: SettingsService): AuthState {
  return {
    accessToken: settingsSvc.token,
    tokenType: settingsSvc.tokenType
  };
}

@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
  constructor(
    private settingsSvc: SettingsService,
  ) {
    super(createInitialState(settingsSvc));
  }

  authenticate(tokenResponse: TokenResponse): void {
    this.update(tokenResponse);
    this.settingsSvc.token = tokenResponse.accessToken;
    this.settingsSvc.tokenType = tokenResponse.tokenType;
  }

  logout(): void {
    this.reset();
    this.settingsSvc.clear();
  }
}
