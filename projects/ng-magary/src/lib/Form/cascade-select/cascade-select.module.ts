import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadeSelect } from './cascade-select';
@NgModule({
  imports: [CommonModule, CascadeSelect],
  exports: [CascadeSelect],
})
export class CascadeSelectModule { }
