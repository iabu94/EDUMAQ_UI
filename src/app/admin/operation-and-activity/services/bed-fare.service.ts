import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BedFare } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BedFareService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<BedFare[]> {
    return this.httpClient.get<BedFare[]>(environment.apiUrl + '/bedfares/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<BedFare> {
    return this.httpClient.get<BedFare>(environment.apiUrl + '/bedfares/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(bedFare): Observable<BedFare> {
    return this.httpClient.post<BedFare>(environment.apiUrl + '/bedfares/', JSON.stringify(bedFare), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, bedFare): Observable<BedFare> {
    return this.httpClient.put<BedFare>(environment.apiUrl + '/bedfares/' + id, JSON.stringify(bedFare), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<BedFare>(environment.apiUrl + '/bedfares/' + id)
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
