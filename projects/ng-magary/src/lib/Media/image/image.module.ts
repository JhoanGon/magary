import { NgModule } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { MagaryImage } from './image';

@NgModule({
  imports: [CommonModule, NgStyle, MagaryImage],
  exports: [MagaryImage],
})
export class MagaryImageModule {}
