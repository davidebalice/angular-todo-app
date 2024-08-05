import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AppConfig } from '../../app-config';
import { PipesModule } from '../../pipes/pipe.module';
@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, PipesModule],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  directory = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { imageUrl: string; directory: string }
  ) {
    this.directory = data.directory;
  }

  getFullImageUrl(imageUrl: string, directory: string): string {
    return `${AppConfig.apiUrl}/${directory}/${imageUrl}`;
  }
}
