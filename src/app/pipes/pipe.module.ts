import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProtectedImagePipe } from './protected-images.pipe';

@NgModule({
  declarations: [ProtectedImagePipe],
  imports: [CommonModule],
  exports: [ProtectedImagePipe], 
})
export class PipesModule {}
