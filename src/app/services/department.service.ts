import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Department } from './../models/department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = 'http://api.local:8000/api'+'/departments';

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getDepartmentById(department_id: number): Observable<Department> {
    return this.httpClient.get<Department>(this.url + '/' + department_id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(this.url, JSON.stringify(department), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.httpClient.put<Department>(this.url + '/' + department.department_id, JSON.stringify(department), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteDepartment(department: Department) {
    return this.httpClient.delete<Department>(this.url + '/' + department.department_id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
