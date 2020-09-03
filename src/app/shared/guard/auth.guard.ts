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

    if (!this.checkSession()) {
      console.log("Invalid")
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

  checkSession() {
    let loggedinUser = localStorage.getItem('userDetails');
    if (loggedinUser != '' && loggedinUser != undefined && loggedinUser != null) {
      this.authService.loggedInUser.next(JSON.parse(loggedinUser));
      this.authService.isLoggedIn = true;
      this.authService.accessToken = JSON.parse(loggedinUser).token;
      return true;
    } else {
      return false;
    }
  }
}
