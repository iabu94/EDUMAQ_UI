import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Batch, Bed, Class, Installment, RoomAllocation, Student } from '../models';
import { Department } from '../models/get-only/department';
import { Designation } from '../models/get-only/designation';
import { Employee } from '../models/get-only/employee';

@Injectable({
  providedIn: 'root',
})
export class RoomAllocationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<RoomAllocation[]> {
    return this.httpClient
      .get<RoomAllocation[]>(environment.apiUrl + '/roomallocations/')
      .pipe(catchError(this.errorHandler));
  }

  create(roomAllocation: RoomAllocation): Observable<RoomAllocation> {
    return this.httpClient
      .post<RoomAllocation>(environment.apiUrl + '/roomallocations/', JSON.stringify(roomAllocation), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getAllClasses(): Observable<Class[]> {
    return this.httpClient
      .get<Class[]>(environment.apiUrl + '/classes/')
      .pipe(catchError(this.errorHandler));
  }

  getAllBatches(): Observable<Batch[]> {
    return this.httpClient
      .get<Batch[]>(environment.apiUrl + '/batches/')
      .pipe(catchError(this.errorHandler));
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(environment.apiUrl + '/students/')
      .pipe(catchError(this.errorHandler));
  }

  getAllInstallments(): Observable<Installment[]> {
    return this.httpClient
      .get<Installment[]>(environment.apiUrl + '/installments/')
      .pipe(catchError(this.errorHandler));
  }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient
      .get<Department[]>(environment.apiUrl + '/departments/')
      .pipe(catchError(this.errorHandler));
  }

  getAllDesignations(): Observable<Designation[]> {
    return this.httpClient
      .get<Designation[]>(environment.apiUrl + '/designations/')
      .pipe(catchError(this.errorHandler));
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(environment.apiUrl + '/employees/')
      .pipe(catchError(this.errorHandler));
  }

  getById(id): Observable<Bed> {
    return this.httpClient
      .get<Bed>(environment.apiUrl + '/beds/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id, bed): Observable<Bed> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient
      .put<Bed>(environment.apiUrl + '/beds/' + id, JSON.stringify(bed), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete<Bed>(environment.apiUrl + '/beds/' + id)
      .pipe(catchError(this.errorHandler));
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
