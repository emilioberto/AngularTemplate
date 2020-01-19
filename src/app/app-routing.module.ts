import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

enum States {
  Home = 'home'
}

const routes: Routes = [
  { path: '', redirectTo: States.Home, pathMatch: 'full' },
  { path: States.Home, loadChildren: () => import('app/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
