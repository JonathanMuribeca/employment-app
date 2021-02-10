import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Job } from './../models/job';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  url = process.env.API_URL + '/jobs';

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getJobById(job_id: number): Observable<Job> {
    return this.httpClient.get<Job>(this.url + '/' + job_id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveJob(job: Job): Observable<Job> {
    return this.httpClient.post<Job>(this.url, JSON.stringify(job), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateJob(job: Job): Observable<Job> {
    return this.httpClient.put<Job>(this.url + '/' + job.job_id, JSON.stringify(job), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteJob(job: Job) {
    return this.httpClient.delete<Job>(this.url + '/' + job.job_id, this.httpOptions)
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
