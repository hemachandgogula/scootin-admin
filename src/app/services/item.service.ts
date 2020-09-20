import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { AddItemRequest } from '../models/request/add-item-request';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllItem(serviceId: number) {
    return this._http.get<any>(environment.apiURL + '/product/get-all/' + serviceId).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  addItem(request: AddItemRequest) {
    return this._http.post<any>(environment.apiURL + '/product/add/' + request.shopManagementId, request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  // deleteItem(id) {
  //   return this._http.delete<any>(environment.apiURL + '/product/add/').pipe(
  //     catchError((error: HttpErrorResponse) => this.utility.handleError(error))
  //   )
  // }
}
