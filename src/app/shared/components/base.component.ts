import { OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import '@app/core/utils/utils';

export abstract class BaseComponent implements OnInit, OnDestroy {

  isLoading$: Observable<boolean>;

  protected subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.onInit();
  }

  ngOnDestroy(): void {
    this.onDestroy();
    this.subscription.unsubscribe();
  }

  handleSubscription(observable: Observable<any>): void {
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
