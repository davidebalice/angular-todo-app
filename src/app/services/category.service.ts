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
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = '/categories/';
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private subscription: Subscription | undefined;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchCategories(): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<Category[]>(this.categoriesUrl, { headers })

      .pipe(
        tap((categories: Category[]) => {
          this.categoriesSubject.next(categories);
        }),
        catchError((error) => {
          console.error('Error fetching categories:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addCategory(category: Category) {
    const headers = this.getHeaders();

    return this.http
      .post(`/categories/add`, category, {
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

          return throwError(
            () => new Error('Error adding category:' + error.error.message)
          );
        })
      );
  }

  updateCategory(id: number, dataCategory: Category) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/categories/${id}`, dataCategory, {
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
          return throwError(
            () => new Error('Error updating category:' + error.error)
          );
        })
      );
  }

  deleteCategory(categoryId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`/categories/delete/${categoryId}`, {
      headers,
    });
  }

  getById(id: number): Observable<Category> {
    const headers = this.getHeaders();

    return this.http
      .get<Category>(`/categories/${id}`, {
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
