import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfig } from 'src/app/app-config';
import { MatModule } from 'src/app/appModules/mat.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [CommonModule, MatModule, SharedModule],
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  directory = null;
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
