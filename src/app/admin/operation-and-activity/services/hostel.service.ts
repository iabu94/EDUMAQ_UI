import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Hostel } from '../models/hostel';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<Hostel[]> {
    return this.httpClient.get<Hostel[]>(environment.apiUrl + '/hostels/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Hostel> {
    return this.httpClient.get<Hostel>(environment.apiUrl + '/hostels/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  create(hostel): Observable<Hostel> {
    return this.httpClient.post<Hostel>(environment.apiUrl + '/hostels/', JSON.stringify(hostel), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, hostel): Observable<Hostel> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Hostel>(environment.apiUrl + '/hostels/' + id, JSON.stringify(hostel), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Hostel>(environment.apiUrl + '/hostels/' + id)
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
