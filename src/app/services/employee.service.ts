import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from './../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://api.local:8000/api'+'/employees';

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getEmployeeById(employee_id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.url + '/' + employee_id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.url, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.url + '/' + employee.employee_id, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteEmployee(employee: Employee) {
    return this.httpClient.delete<Employee>(this.url + '/' + employee.employee_id, this.httpOptions)
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
