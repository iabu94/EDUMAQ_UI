import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(environment.apiUrl + '/rooms/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Room> {
    return this.httpClient.get<Room>(environment.apiUrl + '/rooms/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  create(room): Observable<Room> {
    return this.httpClient.post<Room>(environment.apiUrl + '/rooms/', JSON.stringify(room), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, room): Observable<Room> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<Room>(environment.apiUrl + '/rooms/' + id, JSON.stringify(room), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Room>(environment.apiUrl + '/rooms/' + id)
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
