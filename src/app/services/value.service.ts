import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
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
import { Value } from '../model/value.model';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  private valuesUrl = '/values/';
  private valuesSubject = new BehaviorSubject<Value[]>([]);
  private subscription: Subscription;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchValues(attributeId: number): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<Value[]>(`${this.valuesUrl}idattr/${attributeId}`, {
        headers,
      })
      .pipe(
        tap((values: Value[]) => {
          this.valuesSubject.next(values);
        }),
        catchError((error) => {
          console.error('Error fetching values:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getValues(): Observable<Value[]> {
    return this.valuesSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addValue(value: Value) {
    const headers = this.getHeaders();
    return this.http
      .post(`/values/add`, value, {
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
          return throwError(() => new Error('Error adding value.'));
        })
      );
  }

  updateValue(id: number, dataValue: Value) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/values/${id}`, dataValue, {
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
          return throwError(() => new Error('Error adding value.'));
        })
      );
  }

  deleteValue(attributeId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/values/${attributeId}`, { headers });
  }

  getById(id: number): Observable<Value> {
    const headers = this.getHeaders();

    return this.http
      .get<Value>(`/values/${id}`, {
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
