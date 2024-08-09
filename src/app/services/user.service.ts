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
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = '/users/';
  private usersSubject = new BehaviorSubject<User[]>([]);
  private subscription: Subscription | undefined;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchUsers(): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<User[]>(this.usersUrl, { headers })

      .pipe(
        tap((users: User[]) => {
          this.usersSubject.next(users);
        }),
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addUser(user: User) {
    const headers = this.getHeaders();

    return this.http
      .post(`/users/add`, user, {
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
          return throwError(() => new Error('Error adding user.'));
        })
      );
  }

  updateUser(id: number, dataUser: User) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/users/${id}`, dataUser, {
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
          return throwError(() => new Error('Error adding categoty.'));
        })
      );
  }

  deleteUser(userId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/users/${userId}`, { headers });
  }

  getById(id: number): Observable<User> {
    const headers = this.getHeaders();

    return this.http
      .get<User>(`/users/${id}`, {
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

  getMe(): Observable<User> {
    const headers = this.getHeaders();

    return this.http
      .get<User>(`/users/me`, {
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
