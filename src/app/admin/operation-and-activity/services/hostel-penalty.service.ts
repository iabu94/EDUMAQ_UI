import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HostelPenalty } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HostelPenaltyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<[]> {
    return this.httpClient.get<[]>(environment.apiUrl + '/hostelpenalties/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<HostelPenalty> {
    return this.httpClient.get<HostelPenalty>(environment.apiUrl + '/hostelpenalties/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(hostelPenalty): Observable<HostelPenalty> {
    return this.httpClient.post<HostelPenalty>(environment.apiUrl + '/hostelpenalties/', JSON.stringify(hostelPenalty), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, hostelPenalty): Observable<HostelPenalty> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<HostelPenalty>(environment.apiUrl + '/hostelpenalties/' + id, JSON.stringify(hostelPenalty), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<HostelPenalty>(environment.apiUrl + '/hostelpenalties/' + id)
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
