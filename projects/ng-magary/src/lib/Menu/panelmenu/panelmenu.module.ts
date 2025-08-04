import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Panelmenu } from './panelmenu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, Panelmenu, RouterModule],
  exports: [Panelmenu],
})
export class PanelmenuModule {}
