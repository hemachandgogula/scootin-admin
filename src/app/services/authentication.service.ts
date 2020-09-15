import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../models/request/login-request';
import { environment } from 'src/environments/environment';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/response/login-response';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedInUser: LoginResponse = {
    id: null,
    role: '',
    token: '',
    user: ''
  };
  accessToken: string='';
  constructor(private _http: HttpClient, private utility: UtilityService) { }

  login(request: LoginRequest) {
    return this._http.post<any>(environment.apiURL + '/auth/login/admin', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  refreshToken(request) {
    return this._http.post<any>(environment.apiURL + '/auth/refresh/admin', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  logout() {
    return Observable.throw("");
  }
  checkSession() {
    let loggedinUser = localStorage.getItem('userDetails');
    if (loggedinUser != '' && loggedinUser != undefined && loggedinUser != null) {
      this.loggedInUser = JSON.parse(loggedinUser);
      this.accessToken = JSON.parse(loggedinUser).token;
      return true;
    } else {
      return false;
    }
    //return true;
  }
}
