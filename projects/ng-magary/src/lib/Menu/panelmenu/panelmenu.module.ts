import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryPanelmenu } from './panelmenu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MagaryPanelmenu, RouterModule],
  exports: [MagaryPanelmenu],
})
export class PanelmenuModule {}
