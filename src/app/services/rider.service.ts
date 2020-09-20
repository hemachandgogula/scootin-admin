import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { AddRiderRequest } from '../models/request/add-rider-request';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllRider() {
    return this._http.get<any>(environment.apiURL + '/register/rider/get-all').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  addRider(request: AddRiderRequest) {
    return this._http.post<any>(environment.apiURL + '/register/rider/add',request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  deleteRider(id) {
    return this._http.delete<any>(environment.apiURL + '/register/rider/delete/'+id).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
