import { NgModule } from '@angular/core';
import { MagaryRadioButton } from './radio';
import { MagaryRadioGroup } from './radio-group';
@NgModule({
  imports: [MagaryRadioButton, MagaryRadioGroup],
  exports: [MagaryRadioButton, MagaryRadioGroup],
})
export class MagaryRadioButtonModule {}
