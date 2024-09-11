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
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagsUrl = '/tags/';
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  private subscription: Subscription | undefined;
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  fetchTags(): void {
    const headers = this.getHeaders();
    this.subscription = this.http
      .get<Tag[]>(this.tagsUrl, { headers })

      .pipe(
        tap((tags: Tag[]) => {
          this.tagsSubject.next(tags);
        }),
        catchError((error) => {
          console.error('Error fetching tags:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  getTags(): Observable<Tag[]> {
    console.log('this.tagsSubject');
    console.log(this.tagsSubject);
    return this.tagsSubject.asObservable();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addTag(tag: Tag) {
    const headers = this.getHeaders();

    return this.http
      .post(`/tags/add`, tag, {
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
          return throwError(() => new Error('Error adding tag:' + error.error.message));
        })
      );
  }

  updateTag(id: number, dataTag: Tag) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/tags/${id}`, dataTag, {
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
            () => new Error('Error updating tag:' + error.error)
          );
        })
      );
  }

  deleteTag(tagId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/tags/${tagId}`, { headers });
  }

  getById(id: number): Observable<Tag> {
    const headers = this.getHeaders();

    return this.http
      .get<Tag>(`/tags/${id}`, {
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
