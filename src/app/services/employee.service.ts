import { Injectable } from '@angular/core';
import { AddEmployeeRequest } from '../models/request/add-employee-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  addEmployee(request: AddEmployeeRequest) {
    return this._http.post<any>(environment.apiURL + '/employee/add', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  getAllEmployees() {
    return this._http.get<any>(environment.apiURL + '/employee/get-all').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

  deleteEmployeeById(id: any) {
    return this._http.delete<any>(environment.apiURL + '/employee/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
}
