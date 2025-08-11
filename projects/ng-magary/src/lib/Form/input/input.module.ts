import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryInput } from './input';

@NgModule({
  imports: [CommonModule, MagaryInput],
  exports: [MagaryInput],
})
export class InputModule {}
