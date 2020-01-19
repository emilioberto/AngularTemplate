import { Component } from '@angular/core';

import { deprecate, isNullOrUndefined } from 'util';

import { BaseComponent } from '@app/shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {

  public constructor() {
    super();

    const arr3: [] = [];
    const arr4: number[] = [1, 2, 3];
    const value1 = arr3.isEmpty();
    const value2 = arr4.isEmpty();
    const value4 = arr4.first();
    const value6 = arr4.last();
    const aaa = ''.isEmptyOrWhiteSpace();
    const bba = '   '.isEmptyOrWhiteSpace();
    const bbb = 'gino'.isEmptyOrWhiteSpace();
    const ccc = 'ginocanesuino'.contains('gatto');
    const dddd = 'ginocanesuino'.contains('cAne');
    const gggg = 'ginocanesuino'.contains('cane', false);
    const a = 123;
    const franco = isNullOrUndefined(a);
    const kessie = isNullOrUndefined(null);
  }

  protected onInit(): void { }
  protected onDestroy(): void { }

  public logCiao(): void {
    console.log('ciao');
  }
}
