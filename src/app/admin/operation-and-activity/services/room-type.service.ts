import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { RoomType } from '../models/room-type';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  // Academic Year start
  getAll(): Observable<RoomType[]> {
    return this.httpClient.get<RoomType[]>(environment.apiUrl + '/roomtypes/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<RoomType> {
    return this.httpClient.get<RoomType>(environment.apiUrl + '/roomtypes/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  create(roomType): Observable<RoomType> {
    return this.httpClient.post<RoomType>(environment.apiUrl + '/roomtypes/', JSON.stringify(roomType), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, roomType): Observable<RoomType> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<RoomType>(environment.apiUrl + '/roomtypes/' + id, JSON.stringify(roomType), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<RoomType>(environment.apiUrl + '/roomtypes/' + id)
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
