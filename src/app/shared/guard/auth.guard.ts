import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.checkSession()) {
      this.router.navigate(['/user-pages/login']);
      sessionStorage.clear();
    }

    if (Object.keys(this.authService.loggedInUser).length != 0) {
      return true;
    } else {
      this.router.navigate(['/user-pages/login'])
      sessionStorage.clear();
    }
  }
  
}
