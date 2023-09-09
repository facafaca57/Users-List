import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanActivate {
  isAuth = true;
  constructor( private router: Router ) {}

  canActivate() {
    if (this.isAuth) {
      return true;
    }
    this.router.navigate(['403']);
    return false;
  }

  canActivateChild() {
    return this.canActivate()
  }
}
