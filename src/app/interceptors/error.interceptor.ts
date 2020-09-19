import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../services/utility.service';

export class ErrorInterceptor implements HttpInterceptor {
    constructor(private utility: UtilityService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        this.utility.showError(error.error.message);
                    }
                    else {
                        if (error.error)
                            this.utility.showError(error.error.error);
                        else
                            this.utility.showError(error.statusText);
                    }
                    return throwError(errorMsg);
                })
            )
    }
}