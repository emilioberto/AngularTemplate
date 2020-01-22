import { Injectable } from '@angular/core';

import { Query, toBoolean } from '@datorama/akita';

import { AuthState, AuthStore } from '@app/core/state-management/auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {

  isLoggedIn$ = this.select(state => toBoolean(state.accessToken));

  constructor(protected store: AuthStore) {
    super(store);
  }
}
