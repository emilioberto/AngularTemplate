import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Translation, TRANSLOCO_LOADER, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable()
export class HttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) { }

  getTranslation(langPath: string): Observable<Translation> {
    return this.http.get<Translation>(`/assets/i18n/${langPath}.json`);
  }
}

export const httpLoader = { provide: TRANSLOCO_LOADER, useClass: HttpLoader };
