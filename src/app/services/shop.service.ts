import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { AddShopRequest } from '../models/request/add-shop-request';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  addShop(request: AddShopRequest) {
    return this._http.post<any>(environment.apiURL + '/shops/add-shop', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
