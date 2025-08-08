import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTabs } from './tabs';
import { MagaryTab } from './tab/tab';
@NgModule({
  declarations: [],
  imports: [CommonModule, MagaryTabs, MagaryTab],
  exports: [MagaryTabs, MagaryTab],
})
export class TabsModule {}
