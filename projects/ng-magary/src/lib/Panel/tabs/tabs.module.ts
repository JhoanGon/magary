import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs } from './tabs';
import { Tab } from './tab/tab';

@NgModule({
  declarations: [],
  imports: [CommonModule, Tabs, Tab],
  exports: [Tabs, Tab],
})
export class TabsModule {}
