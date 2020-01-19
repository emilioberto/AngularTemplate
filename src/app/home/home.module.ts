import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '@app/core/core.module';
import { HomeComponent } from '@app/home/home.component';
import { MaterialModule } from '@app/material/material.module';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CoreModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
