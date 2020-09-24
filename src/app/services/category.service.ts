import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllCategory() {
    return this._http.get<any>(environment.apiURL + '/category/get-all-shop-category').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  toggleCategory(state: boolean, categoryId: number) {
    return this._http.post<any>(environment.apiURL + '/category/active/' + categoryId, { active: state }).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
