import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { finalize, catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { LoginResponse } from '../models/response/login-response';
import { UtilityService } from '../services/utility.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(private authService: AuthenticationService, private utility: UtilityService) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: "Bearer " + token } })
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!(request.url.includes('/auth/login/admin') || request.url.includes('/auth/refresh/admin')))
            return next.handle(this.addToken(request, this.authService.accessToken)).pipe(
                catchError(error => {
                    if (error.error instanceof ErrorEvent && error.status!=401) {
                        this.utility.showError(error.error.message);
                    }
                    else if(error.status!=401) {
                        if (error.error)
                            this.utility.showError(error.error.error);
                        else
                            this.utility.showError(error.statusText);
                    }
                    if (error instanceof HttpErrorResponse)
                        switch (error.status) {
                            case 401:
                                return this.unAuthorizedError(request, next);
                            case 403:
                                return this.unAuthorizedError(request, next);
                        }

                    return throwError(error);
                })
            );
        else
            return next.handle(request).pipe(
                catchError(error => {
                    if (error.error instanceof ErrorEvent) {
                        this.utility.showError(error.error.message);
                    }
                    else {
                        if (error.error)
                            this.utility.showError(error.error.error);
                        else
                            this.utility.showError(error.statusText);
                    }
                    return throwError(error);
                })
            );
    }
    unAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);
            let request = {
                auth: this.authService.accessToken
            }
            return this.authService.refreshToken(request).pipe(
                switchMap((newTokenResponse: LoginResponse) => {
                    if (newTokenResponse.token) {
                        this.authService.accessToken = newTokenResponse.token;
                        this.tokenSubject.next(newTokenResponse.token);
                        return next.handle(this.addToken(req, newTokenResponse.token));
                    }
                    return this.authService.logout();
                }),
                catchError(error => {
                    return this.authService.logout();
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                })
            )
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                })
            )
        }
    }
}
