import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { SettingsService } from '@app/core/services/settings.service';
import { BaseComponent } from '@app/shared/components/base.component';
import { CredentialsData } from '@app/shared/models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  public formGroup: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private settingsSvc: SettingsService,
    private navigationSvc: NavigationService,
  ) {
    super();
  }

  protected onInit(): void {
    this.buildForm();
  }

  protected onDestroy(): void { }

  public authenticate(): void {
    const credentials = this.formGroup.getRawValue() as CredentialsData;
    this.handleSubscription(
      this.authSvc.authenticate(credentials)
        .pipe(
          tap(res => {
            this.settingsSvc.token = res.accessToken;
            this.settingsSvc.tokenType = res.tokenType;
            this.navigationSvc.home();
          })
        )
    );
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
