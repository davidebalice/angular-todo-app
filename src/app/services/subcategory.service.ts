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
import { Subcategory } from '../model/subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private subcategoriesUrl = '/subcategories/';
  private subcategoriesSubject = new BehaviorSubject<Subcategory[]>([]);
  private subscription: Subscription;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchSubcategories(categoryId: number): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<Subcategory[]>(`${this.subcategoriesUrl}idcat/${categoryId}`, {
        headers,
      })
      .pipe(
        tap((subcategories: Subcategory[]) => {
          this.subcategoriesSubject.next(subcategories);
        }),
        catchError((error) => {
          console.error('Error fetching subcategories:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getSubcategories(): Observable<Subcategory[]> {
    return this.subcategoriesSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addSubcategory(subCategory: Subcategory) {
    const headers = this.getHeaders();
    return this.http
      .post(`/subcategories/add`, subCategory, {
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
          return throwError(() => new Error('Error adding subcategory.'));
        })
      );
  }

  updateSubcategory(id: number, dataSubcategory: Subcategory) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/subcategories/${id}`, dataSubcategory, {
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
          return throwError(() => new Error('Error adding subcategory.'));
        })
      );
  }

  deleteSubcategory(categoryId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/subcategories/${categoryId}`, { headers });
  }

  getById(id: number): Observable<Subcategory> {
    const headers = this.getHeaders();

    return this.http
      .get<Subcategory>(`/subcategories/${id}`, {
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
