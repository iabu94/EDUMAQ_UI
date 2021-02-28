import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Academicyear } from './models/academicyear';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<Academicyear[]> {
    return this.httpClient.get<Academicyear[]>(environment.apiUrl + '/academics/')
    .pipe(
      catchError(this.errorHandler)
    );
  }
  getById(id): Observable<Academicyear> {
    return this.httpClient.get<Academicyear>(environment.apiUrl + '/academics/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  isCurrentAcademicYearExits(): Observable<Academicyear> {
    return this.httpClient.get<Academicyear>(environment.apiUrl + '/academics/IsCurrentAcademicYearExits')
    .pipe(
      catchError(this.errorHandler)
    );
  }
  create(academicyear): Observable<Academicyear> {
    return this.httpClient.post<Academicyear>(environment.apiUrl + '/academics/', JSON.stringify(academicyear), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, academicyear): Observable<Academicyear> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Academicyear>(environment.apiUrl + '/academics/' + id, JSON.stringify(academicyear), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Academicyear>(environment.apiUrl + '/academics/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }


}
