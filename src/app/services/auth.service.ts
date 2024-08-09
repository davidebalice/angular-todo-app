import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/login';
  private loggedUrl = '/users/me';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }).pipe(
      tap((response) => {
        this.setToken(response);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  private setToken(authResult: any): void {
    const token = authResult['jwt-token'];
    localStorage.setItem('token', token);
    this.router.navigate(['/recipes']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.isLoggedInSubject.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getLoggedUser(): Observable<any> {
    return this.http.get<any>(this.loggedUrl).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  getUserDetails(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
