import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: false,
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: string, defaultImageUrl: string): string {
    return value || defaultImageUrl;
  }
}
