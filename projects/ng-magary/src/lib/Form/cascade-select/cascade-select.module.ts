import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryCascadeSelect } from './cascade-select';
@NgModule({
  imports: [CommonModule, MagaryCascadeSelect],
  exports: [MagaryCascadeSelect],
})
export class CascadeSelectModule {}
