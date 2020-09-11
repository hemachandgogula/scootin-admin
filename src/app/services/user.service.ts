import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllUser() {
    return this._http.get<any>(environment.apiURL + '/user/user-details?offset=5&pageNumber=1&pageSize=10').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

}
