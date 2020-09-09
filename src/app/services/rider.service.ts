import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllRider() {
    return this._http.get<any>(environment.apiURL + '/rider/get-all-riders').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
