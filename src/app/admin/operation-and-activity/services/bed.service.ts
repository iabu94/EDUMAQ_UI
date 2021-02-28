import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Bed } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<Bed[]> {
    return this.httpClient.get<Bed[]>(environment.apiUrl + '/beds/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Bed> {
    return this.httpClient.get<Bed>(environment.apiUrl + '/beds/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(bed): Observable<Bed> {
    return this.httpClient.post<Bed>(environment.apiUrl + '/beds/', JSON.stringify(bed), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, bed): Observable<Bed> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Bed>(environment.apiUrl + '/beds/' + id, JSON.stringify(bed), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Bed>(environment.apiUrl + '/beds/' + id)
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
