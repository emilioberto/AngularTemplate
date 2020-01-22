import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take, tap } from 'rxjs/operators';

import { AuthService } from '@app/core/services/auth.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { AuthQuery } from '@app/core/state-management/auth.query';
import { BaseComponent } from '@app/shared/components/base.component';
import { CredentialsData } from '@app/shared/models/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService
  ) {
    super();
  }

  protected onInit(): void {
    this.buildForm();
  }

  protected onDestroy(): void { }

  authenticate(): void {
    const credentials = this.formGroup.getRawValue() as CredentialsData;
    this.handleSubscription(
      this.authSvc.authenticate(credentials)
    );
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
