import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@app/core/core.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { States } from '@app/core/services/navigation.service';

const routes: Routes = [
  { path: '', redirectTo: States.Login, pathMatch: 'full' },
  { path: States.Login, loadChildren: () => import('app/login/login.module').then(m => m.LoginModule) },
  { path: States.Home, loadChildren: () => import('app/home/home.module').then(m => m.HomeModule), canLoad: [AuthGuard] },
  { path: '**', loadChildren: () => import('app/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
