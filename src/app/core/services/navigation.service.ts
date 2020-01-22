import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum States {
  Home = 'home',
  Login = 'login'
}

@Injectable()
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  home(): Promise<boolean> {
    return this.router.navigate([States.Home]);
  }

  login(): Promise<boolean> {
    return this.router.navigate([States.Login]);
  }

}
