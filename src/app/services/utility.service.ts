import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _http: HttpClient) { }

  uploadImage(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    return this._http.post<any>(environment.apiURL + '/media/upload-image', formData).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  handleError(error) {
    return throwError(error);
  }
}
