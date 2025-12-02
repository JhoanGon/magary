import { NgModule } from '@angular/core';
import { MagaryToast } from './toast';
import { MagaryToastItem } from './toast-item';

@NgModule({
  imports: [MagaryToast, MagaryToastItem],
  exports: [MagaryToast, MagaryToastItem],
})
export class MagaryToastModule {}
