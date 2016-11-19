import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
/**
 * This service is a Guard that does not allow the user to navigate to page URLs if not logged in
 * This service is used in router modules
 */
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * @returns: True if user is logged in as correct user! False otherwise
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  /**
   * @returns: True if user is logged in as correct user! False otherwise (Child routes)
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  /**
   * Checks if user is logged in and checks if URL contains login type
   */
  checkLogin(url: string): boolean {
    

    if (this.authService.isLoggedIn && 
                url.indexOf(this.authService.logInType) !== -1) {
        return true;
    }
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;

  }


}