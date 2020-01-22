import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { SettingsService } from '@app/core/services/settings.service';

@Injectable()
export class BaseHttpService {

  readonly baseUrl = environment.baseUrl;
  readonly baseApiUrl = `${this.baseUrl}api/`;

  readonly unauthorizedEvt = new EventEmitter<void>();

  constructor(
    protected http: HttpClient,
    private settingsSvc: SettingsService
  ) { }

  get<T>(
    url: string,
    queryParams: HttpParams = null,
    auth: boolean = true,
    options: HttpOptions = null,
    useAsRelative: boolean = true
  ): Observable<T> {
    const action = () =>
      this.http.get<T>(
        this.buildUrl(url, useAsRelative), Object.assign(this.buildOptions(auth, queryParams), options) as {}
      );

    return action().pipe<T>(catchError(err => this.handleError(err, () => action())));
  }

  post<T>(
    url: string,
    data: any,
    queryParams: HttpParams = null,
    auth: boolean = true,
    options: HttpOptions = null,
    useAsRelative: boolean = true): Observable<T> {
    const action = () =>
      this.http.post<T>(this.buildUrl(url, useAsRelative), data, Object.assign(this.buildOptions(auth, queryParams), options) as {});

    return action().pipe<T>(catchError(err => this.handleError(err, () => action())));
  }

  delete(
    url: string,
    queryParams: HttpParams = null,
    auth: boolean = true,
    options: HttpOptions = null,
    useAsRelative: boolean = true): Observable<void> {
    const action = () =>
      this.http.delete<void>(this.buildUrl(url, useAsRelative), Object.assign(this.buildOptions(auth, queryParams), options) as {});

    return action().pipe<void>(catchError(err => this.handleError(err, () => action())));
  }

  patch(
    url: string,
    data: any, // TODO
    entityId: number,
    queryParams: HttpParams = null,
    auth: boolean = true,
    options: HttpOptions = null,
    useAsRelative: boolean = true): Observable<number> {
    const action = () =>
      this.http.patch<number>(this.buildUrl(url, useAsRelative), data, Object.assign(this.buildOptions(auth, queryParams), options) as {});

    if (!data || !data.length) { // If nothing to patch return the entityId and prevent an useless request/400 from the server.
      return of(entityId).pipe(take(1));
    }
    return action().pipe(catchError(err => this.handleError(err, () => action())));
  }

  put<T>(
    url: string,
    data: any,
    queryParams: HttpParams = null,
    auth: boolean = true,
    options: HttpOptions = null,
    useAsRelative: boolean = true): Observable<T> {
    const action = () =>
      this.http.put<T>(this.buildUrl(url, useAsRelative), data, Object.assign(this.buildOptions(auth, queryParams), options) as {});

    return action().pipe<T>(catchError(err => this.handleError(err, () => action())));
  }

  getForDownload(
    url: string,
    queryParams: HttpParams = null,
    auth: boolean = true,
    useAsRelative: boolean = true): Observable<Blob> {
    const action = () => {
      const options = this.buildOptions(auth, queryParams);
      options.responseType = 'blob';
      return this.http.get<Blob>(this.buildUrl(url, useAsRelative), options as {});
    };

    return action().pipe<Blob>(catchError(err => this.handleError(err, () => action())));
  }

  private handleError<T>(err: any, action: () => Observable<T>): Observable<T> {
    console.error('---', err, '---');

    if (err.status !== 401) {
      return throwError(err);
    }

    return this.refreshToken()
      .pipe(
        switchMap(() => action()),
        catchError(refreshError => {
          this.unauthorizedEvt.emit();
          return throwError(refreshError);
        })
      );
  }

  refreshToken(): Observable<boolean> {
    return of(true);
    // const ops: HttpOptions = {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };

    // const content = this.buildQueryParams(
    //   { key: 'grant_type', value: 'refresh_token' },
    //   { key: 'client_id', value: environment.authClientId },
    //   { key: 'client_secret', value: environment.authClientSecret },
    //   { key: 'refresh_token', value: this.settingsSvc.refreshToken }
    // ).toString();

    // return this
    //   .post<AuthResponse>(`${this.baseUrl}connect/token`, content, null, false, ops, false)
    //   .pipe(
    //     tap(res => {
    //       this.settingsSvc.token = res.access_token;
    //       this.settingsSvc.tokenType = res.token_type;
    //       this.settingsSvc.refreshToken = res.refresh_token;
    //     }),
    //     map(res => !!res)
    //   );
  }

  private buildOptions(auth: boolean, params: HttpParams): HttpOptions {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    if (auth) {
      headers = headers.append('Authorization', `${this.settingsSvc.tokenType} ${this.settingsSvc.token}`);
    }

    return {
      headers,
      params
    };
  }

  private buildUrl(url: string, useAsRelative: boolean): string {
    if (useAsRelative) {
      return `${this.baseApiUrl}${url}`;
    }
    return url;
  }

  buildQueryParams(...items: { key: string, value: string }[]): HttpParams {
    let params = new HttpParams();
    items.forEach(i => params = params.append(i.key, i.value));
    return params;
  }

  buildAuthorizationHeader(): string {
    return `${this.settingsSvc.tokenType} ${this.settingsSvc.token}`;
  }

}

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: string;
  withCredentials?: boolean;
}
