import { OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import '@app/core/utils/utils';

export abstract class BaseComponent implements OnInit, OnDestroy {

  public isLoading = false;

  protected subscription = new Subscription();

  public ngOnInit(): void {
    this.onInit();
  }

  public ngOnDestroy(): void {
    this.onDestroy();
    this.subscription.unsubscribe();
  }

  protected abstract onInit(): void;
  protected abstract onDestroy(): void;
}
