import { Injectable } from '@angular/core';

import { LocalStorageService } from '@app/core/services/local-storage.service';

@Injectable()
export class SettingsService {

  private static readonly langKey = 'language';
  private static readonly tokenKey = 'access_token';
  private static readonly tokenTypeKey = 'token_type';
  private static readonly refreshTokenKey = 'refresh_token';

  public constructor(
    private localStorageSvc: LocalStorageService
  ) { }

  public get language(): string {
    return this.localStorageSvc.get(SettingsService.langKey);
  }

  public set language(language: string) {
    this.localStorageSvc.set(SettingsService.langKey, language);
  }

  public get token(): string {
    return this.localStorageSvc.get(SettingsService.tokenKey);
  }

  public set token(token: string) {
    this.localStorageSvc.set(SettingsService.tokenKey, token);
  }

  public get tokenType(): string {
    return this.localStorageSvc.get(SettingsService.tokenTypeKey);
  }

  public set tokenType(tokenType: string) {
    this.localStorageSvc.set(SettingsService.tokenTypeKey, tokenType);
  }

  public get refreshToken(): string {
    return this.localStorageSvc.get(SettingsService.refreshTokenKey);
  }

  public set refreshToken(refreshToken: string) {
    this.localStorageSvc.set(SettingsService.refreshTokenKey, refreshToken);
  }

  public clear(): void {
    this.localStorageSvc.clear();
  }

}
