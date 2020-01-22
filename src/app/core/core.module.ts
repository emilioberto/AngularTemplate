import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { LoggedInGuard } from '@app/core/guards/logged-in.guard';
import { AuthService } from '@app/core/services/auth.service';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { SettingsService } from '@app/core/services/settings.service';
import { AuthQuery } from '@app/core/state-management/auth.query';
import { AuthStore } from '@app/core/state-management/auth.store';
import { httpLoader } from '@app/core/transloco/http-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslocoModule,
  ],
  providers: [
    AuthGuard,
    AuthQuery,
    AuthService,
    AuthStore,
    BaseHttpService,
    LocalStorageService,
    LoggedInGuard,
    NavigationService,
    SettingsService,
    httpLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'it'],
        reRenderOnLangChange: true,
        fallbackLang: 'it',
        defaultLang: 'en'
      } as TranslocoConfig
    }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
