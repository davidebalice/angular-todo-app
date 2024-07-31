import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Pipe({
  name: 'protectedImage',
})
export class ProtectedImagePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(url: string): Observable<string | null> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob: Blob) => {
        return this.createImageFromBlob(blob);
      }),
      catchError((error) => {
        console.error("Errore durante il caricamento dell'immagine", error);
        return of(null);
      })
    );
  }

  private createImageFromBlob(blob: Blob): string {
    return URL.createObjectURL(blob);
  }
}
