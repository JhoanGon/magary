import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryCard } from './card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MagaryCard],
  exports: [MagaryCard],
})
export class CardModule {}
