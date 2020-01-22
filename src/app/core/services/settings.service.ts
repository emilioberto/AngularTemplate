import { Injectable } from '@angular/core';

import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable()
export class SettingsService {

  private static readonly langKey = 'language';
  private static readonly tokenKey = 'access_token';
  private static readonly tokenTypeKey = 'token_type';
  private static readonly refreshTokenKey = 'refresh_token';

  constructor(
    private localStorageSvc: LocalStorageService
  ) { }

  get language(): string {
    return this.localStorageSvc.get(SettingsService.langKey);
  }

  set language(language: string) {
    this.localStorageSvc.set(SettingsService.langKey, language);
  }

  get token(): string {
    return this.localStorageSvc.get(SettingsService.tokenKey);
  }

  set token(token: string) {
    this.localStorageSvc.set(SettingsService.tokenKey, token);
  }

  get tokenType(): string {
    return this.localStorageSvc.get(SettingsService.tokenTypeKey);
  }

  set tokenType(tokenType: string) {
    this.localStorageSvc.set(SettingsService.tokenTypeKey, tokenType);
  }

  get refreshToken(): string {
    return this.localStorageSvc.get(SettingsService.refreshTokenKey);
  }

  set refreshToken(refreshToken: string) {
    this.localStorageSvc.set(SettingsService.refreshTokenKey, refreshToken);
  }

  clear(): void {
    this.localStorageSvc.clear();
  }

}
