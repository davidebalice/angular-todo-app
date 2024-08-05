import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Todo } from '../model/todo.model';
@Injectable()
export class TodoService implements OnInit, OnDestroy {
  todosList = new Subject<Todo[]>();
  todoSelected = new Subject<Todo>();
  error = new Subject<string>();
  csrfToken: Subject<string> = new Subject<string>();
  csrfValue!: string;
  private todos!: Todo[];
  tokenValue!: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.csrfToken.subscribe((value: string) => {
      this.csrfValue = value;
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    });
  }

  private getHeadersForm(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
  }

  getCsrf() {
    const csrfUrl = '/csrf';

    this.http.post(csrfUrl, null, {}).subscribe(
      (response: any) => {
        this.csrfToken.next(response.token.trim());
        this.csrfValue = response.token.trim();
        this.error.next('');
      },
      (error) => {
        console.error('Error fetching CSRF token', error);
        this.error.next(error.message);
      }
    );
  }

  fetchTodos(
    keyword?: string,
    category?: number,
    limit?: number,
    page: number = 1
  ): Observable<{ todos: Todo[]; totalItems: number }> {
    const headers = this.getHeaders();
    let apiUrl = '/todos/';
    let params = new HttpParams();

    if (keyword) {
      apiUrl = '/todos/search';
      params = params.append('keyword', keyword);
    } else {
      if (category! > 0) {
        apiUrl = '/todos/searchByCategoryId';
        params = params.append('categoryId', category!);
      }
    }

    if (limit) {
      params = params.append('size', limit);
    }
    params = params.append('page', (page - 1).toString());

    return this.http
      .get<{ todos: Todo[]; totalItems: number }>(apiUrl, {
        headers,
        params,
      })
      .pipe(
        map((response) => {
          return {
            todos: response.todos.map((todo) => ({
              ...todo,
              categoryName: todo.categoryDto?.name || 'Unknown Category',
            })),
            totalItems: response.totalItems,
          };
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error('Error loading todos.'));
        })
      );
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  getById(id: number): Observable<Todo> {
    const headers = this.getHeaders();

    let params = new HttpParams();
    params = params.append('test1', '1');
    params = params.append('test2', '1');

    return this.http
      .get<Todo>(`/todos/${id}`, {
        headers,
        params,
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

  addTodo(todo: Todo) {
    const headers = this.getHeaders();

    return this.http
      .post(`/todos/add`, todo, {
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
            () => new Error('Error adding todo.' + error.error.message)
          );
        })
      );
  }

  addTodoWithPhoto(todo: FormData) {
    const headers = this.getHeadersForm();

    return this.http.post(`/todos/add-with-photo`, todo, { headers }).pipe(
      tap((response) => {
        console.log('Response from backend:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error('Error adding todo.'));
      })
    );
  }

  updateTodo(id: number, dataTodo: Todo) {
    const headers = this.getHeaders();
    return this.http
      .patch(`/todos/${id}`, dataTodo, {
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
            () => new Error('Error updating todo. ' + error.error)
          );
        })
      );
  }

  deleteTodo(todoId: number) {
    const headers = this.getHeaders();
    return this.http.delete(`/todos/${todoId}`, { headers });
  }

  uploadTodo(id: number, imageFile: File) {
    const formData = new FormData();
    if (imageFile instanceof File) {
      formData.append('image', imageFile, imageFile.name);

      const url = `/todos/${id}/uploadImage`;

      const headers = new HttpHeaders();
      headers.set('Cache-Control', 'no-cache');

      return this.http.post(url, formData, { headers }).pipe(
        tap((response) => {
          console.log('Response from backend:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
          return throwError(
            () => new Error('Error uploading image. ' + error.error.message)
          );
        })
      );
    } else {
      return throwError(() => new Error('Provided image is not a file.'));
    }
  }

  uploadGallery(id: number, imageFiles: File[]): Observable<any> {
    const formData = new FormData();

    imageFiles.forEach((file, index) => {
      if (file instanceof File) {
        formData.append('images', file, file.name);
      } else {
        throw new Error(`Provided item at index ${index} is not a file.`);
      }
    });

    const url = `/todos/${id}/gallery/upload`;

    const headers = new HttpHeaders();
    headers.set('Cache-Control', 'no-cache');

    return this.http.post(url, formData, { headers }).pipe(
      tap((response) => {
        console.log('Response from backend:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(
          () => new Error('Error uploading images. ' + error.error.message)
        );
      })
    );
  }

  getImages(id: number): Observable<string[]> {
    const url = `/todos/${id}/gallery`;

    const headers = new HttpHeaders();
    headers.set('Cache-Control', 'no-cache');

    return this.http.get<string[]>(url, { headers }).pipe(
      tap((response) => {
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(
          () => new Error('Error fetching images. ' + error.message)
        );
      })
    );
  }
}
