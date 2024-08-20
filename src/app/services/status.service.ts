import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import {
    BehaviorSubject,
    Observable,
    Subscription,
    catchError,
    map,
    tap,
    throwError,
  } from 'rxjs';
  import { Status } from '../model/status.model';
  
  @Injectable({
    providedIn: 'root',
  })
  export class StatusService {
    private statusUrl = '/status/';
    private statusSubject = new BehaviorSubject<Status[]>([]);
    private subscription: Subscription | undefined;
    constructor(private http: HttpClient, private router: Router) {}
  
    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      });
    }
  
    fetchStatus(): void {
      const headers = this.getHeaders();
      this.subscription = this.http
        .get<Status[]>(this.statusUrl, { headers })
  
        .pipe(
          tap((status: Status[]) => {
            this.statusSubject.next(status);
          }),
          catchError((error) => {
            console.error('Error fetching status:', error);
            return throwError(error);
          })
        )
        .subscribe();
    }
  
    getStatus(): Observable<Status[]> {
      return this.statusSubject.asObservable();
    }
  
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  
    addStatus(status: Status) {
      const headers = this.getHeaders();
  
      return this.http
        .post(`/status/add`, status, {
          withCredentials: true,
          headers,
        })
        .pipe(
          tap((response) => {
            console.log('Response from backend:', response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
            return throwError(() => new Error('Error adding status.'));
          })
        );
    }
  
    updateStatus(id: number, dataStatus: Status) {
      const headers = this.getHeaders();
      return this.http
        .patch(`/status/${id}`, dataStatus, {
          withCredentials: true,
          responseType: 'text',
          headers,
        })
        .pipe(
          tap((response) => {
            console.log('Response from backend:', response);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
            return throwError(() => new Error('Error adding status.'));
          })
        );
    }
  
    deleteStatus(statusId: number) {
      const headers = this.getHeaders();
      return this.http.delete(`/status/delete/${statusId}`, { headers });
    }
  
    getById(id: number): Observable<Status> {
      const headers = this.getHeaders();
  
      return this.http
        .get<Status>(`/status/${id}`, {
          headers,
        })
        .pipe(
          map((responseData) => {
            return responseData;
          }),
          catchError((error) => {
            console.error('Errore nella richiesta HTTP', error);
            return throwError(error);
          })
        );
    }
  }
  