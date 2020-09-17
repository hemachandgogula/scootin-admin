import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _http: HttpClient,private toastr: ToastrService) { }

  uploadImage(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    return this._http.post<any>(environment.apiURL + '/media/upload-image', formData).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }
  showSuccess(message:string) {
    this.toastr.success(message, 'Success');
  }
  showError(message:string) {
    this.toastr.error(message, 'Failed');
  }

  handleError(error) {
    return throwError(error);
  }
}
