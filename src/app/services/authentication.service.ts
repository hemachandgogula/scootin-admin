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

  loggedInUser: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);
  isLoggedIn: boolean = false;
  accessToken: string;
  constructor(private _http: HttpClient,private utility:UtilityService) { }

  login(request: LoginRequest) {
    return this._http.post<any>(environment.apiURL + '/auth/login', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  } 
  refreshToken(){
    return this._http.post<any>(environment.apiURL + '/auth/refresh', {}).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  logout(){
    return Observable.throw("");
  }
}
