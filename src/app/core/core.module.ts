import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule } from '@ngneat/transloco';

import { AuthService } from '@app/core/services/auth.service';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { SettingsService } from '@app/core/services/settings.service';
import { httpLoader } from '@app/core/transloco/http-loader';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    TranslocoModule,
  ],
  providers: [
    AuthService,
    BaseHttpService,
    LocalStorageService,
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
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}
