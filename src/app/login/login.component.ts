import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';
import { AuthQuery } from '@app/core/state/auth.query';
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
    private authSvc: AuthService,
    private authQuery: AuthQuery
  ) {
    super();
  }

  protected onInit(): void {
    this.isLoading$ = this.authQuery.selectLoading();
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
