import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@app/home/home.component';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
