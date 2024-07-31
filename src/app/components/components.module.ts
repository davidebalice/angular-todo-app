import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatModule } from '../appModules/mat.module';

@NgModule({
  imports: [CommonModule, MatModule, MatDialogModule],
})
export class ComponentsModule {}
