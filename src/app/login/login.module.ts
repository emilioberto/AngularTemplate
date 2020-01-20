import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@app/login/login.component';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
