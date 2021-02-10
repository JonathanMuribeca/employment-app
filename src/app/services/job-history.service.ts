import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { JobHistory } from './../models/job-history';


@Injectable({
  providedIn: 'root'
})
export class JobHistoryService {
  url = process.env.API_URL + '/job-history';

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getJobHistorys(): Observable<JobHistory[]> {
    return this.httpClient.get<JobHistory[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getJobHistoryById(job_history_id: number): Observable<JobHistory> {
    return this.httpClient.get<JobHistory>(this.url + '/' + job_history_id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveJobHistory(job_history: JobHistory): Observable<JobHistory> {
    return this.httpClient.post<JobHistory>(this.url, JSON.stringify(job_history), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateJobHistory(job_history: JobHistory): Observable<JobHistory> {
    return this.httpClient.put<JobHistory>(this.url + '/' + job_history.job_history_id, JSON.stringify(job_history), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteJobHistory(job_history: JobHistory) {
    return this.httpClient.delete<JobHistory>(this.url + '/' + job_history.job_history_id, this.httpOptions)
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
