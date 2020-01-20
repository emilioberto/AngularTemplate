import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum States {
  Home = 'home',
  Login = 'login'
}

@Injectable()
export class NavigationService {

  public constructor(
    private router: Router
  ) { }

  public home(): Promise<boolean> {
    return this.router.navigate([States.Home]);
  }

  public login(): Promise<boolean> {
    return this.router.navigate([States.Login]);
  }

}
