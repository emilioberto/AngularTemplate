import { OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import '@app/core/utils/utils';

export abstract class BaseComponent implements OnInit, OnDestroy {

  public isLoading = false;

  protected subscription = new Subscription();

  public constructor() { }

  public ngOnInit(): void {
    this.onInit();
  }

  public ngOnDestroy(): void {
    this.onDestroy();
    this.subscription.unsubscribe();
  }

  public handleSubscription(observable: Observable<any>): void {
    this.subscription.add(
      observable.subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    );
  }

  protected abstract onInit(): void;
  protected abstract onDestroy(): void;
}
