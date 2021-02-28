import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Floor } from '../models/floor';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<Floor[]> {
    return this.httpClient.get<Floor[]>(environment.apiUrl + '/floors/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Floor> {
    return this.httpClient.get<Floor>(environment.apiUrl + '/floors/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(floor): Observable<Floor> {
    return this.httpClient.post<Floor>(environment.apiUrl + '/floors/', JSON.stringify(floor), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, floor): Observable<Floor> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Floor>(environment.apiUrl + '/floors/' + id, JSON.stringify(floor), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Floor>(environment.apiUrl + '/floors/' + id)
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
