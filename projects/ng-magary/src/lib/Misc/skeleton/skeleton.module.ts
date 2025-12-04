import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagarySkeleton } from './skeleton';

@NgModule({
  imports: [CommonModule, MagarySkeleton],
  exports: [MagarySkeleton],
})
export class SkeletonModule {}
