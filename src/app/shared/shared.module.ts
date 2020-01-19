import { NgModule } from '@angular/core';

import { TranslocoModule } from '@ngneat/transloco';

import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    TranslocoModule
  ],
  exports: [
    CoreModule,
    TranslocoModule
  ]
})
export class SharedModule { }
