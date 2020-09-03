import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllReceivedOrders() {
    return this._http.get<any>(environment.apiURL + 'order/orders/received?offset=5&pageNumber=1&pageSize=5').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
