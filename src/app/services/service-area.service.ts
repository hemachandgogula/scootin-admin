import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { AddShopRequest } from '../models/request/add-shop-request';
import { ServiceArea } from '../models/service-area';

@Injectable({
  providedIn: 'root'
})
export class ServiceAreaService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }
  addServiceArea(request: ServiceArea) {
    return this._http.post<any>(environment.apiURL + '/service-area/add', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  updateServiceArea(request: ServiceArea, serviceAreaId: number) {
    return this._http.post<any>(environment.apiURL + '/service-area/update/'+serviceAreaId, request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  deleteServiceArea(id: number) {
    return this._http.delete<any>(environment.apiURL + '/service-area/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  getAllServiceArea() {
    return this._http.get<any>(environment.apiURL + '/service-area/get-all').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
