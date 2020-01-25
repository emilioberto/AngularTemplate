import { action, resetStores, Store, StoreConfig } from '@datorama/akita';

import { SettingsService } from '@app/core/services/settings.service';
import { TokenResponse } from '@app/shared/models/authentication';

// tslint:disable-next-line:no-empty-interface
export interface AuthState extends TokenResponse { }

export function createInitialState(): AuthState {
  return {
    accessToken: null,
    tokenType: null,
  };
}

@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
  constructor(
    private settingsSvc: SettingsService,
  ) {
    super(createInitialState());
    if (this.settingsSvc.token && this.settingsSvc.tokenType) {
      this.recoverAuthenticatedState();
    }
  }

  @action('Logged in')
  login(tokenResponse: TokenResponse): void {
    this.update(tokenResponse);
    this.settingsSvc.token = tokenResponse.accessToken;
    this.settingsSvc.tokenType = tokenResponse.tokenType;
  }

  @action('Logged out')
  logout(): void {
    this.settingsSvc.clear();
    resetStores();
  }

  @action('Recovered already authenticated user')
  private recoverAuthenticatedState(): void {
    this.update({
      accessToken: this.settingsSvc.token,
      tokenType: this.settingsSvc.tokenType,
    });
  }

}
