import { Component } from '@angular/core';

import { AuthService } from '@app/core/services/auth.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { SettingsService } from '@app/core/services/settings.service';
import { BaseComponent } from '@app/shared/components/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  public constructor(
    private settingsSvc: SettingsService,
    private authSvc: AuthService,
  ) {
    super();
  }

  protected onInit(): void { }

  protected onDestroy(): void { }

  public logout(): void {
    this.authSvc.logout();
  }
}
