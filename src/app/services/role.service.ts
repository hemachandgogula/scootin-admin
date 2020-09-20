import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UtilityService } from './utility.service';
import { AddRoleRequest } from '../models/request/add-role-request';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient, private utility: UtilityService) { }

  getAllAdmin() {
    return this._http.get<any>(environment.apiURL + '/register/admins/get-all').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  addRole(request: AddRoleRequest) {
    return this._http.post<any>(environment.apiURL + '/register/admin/add', request).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  deleteUser(id: number) {
    return this._http.delete<any>(environment.apiURL + '/register/admin/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }
  getAllRoles() {
    return this._http.get<any>(environment.apiURL + '/register/get-all-roles').pipe(
      catchError((error: HttpErrorResponse) => this.utility.handleError(error))
    )
  }

}
