import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagarySpeedDial } from './speed-dial';
@NgModule({
  imports: [CommonModule, MagarySpeedDial],
  exports: [MagarySpeedDial],
})
export class SpeedDialModule {}
