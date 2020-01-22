import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '@app/not-found/not-found.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
