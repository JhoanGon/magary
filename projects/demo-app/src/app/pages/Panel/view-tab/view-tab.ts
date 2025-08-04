import { Component } from '@angular/core';
import { MagaryTabs, MagaryTab } from 'ng-magary';

@Component({
  selector: 'magary-view-tab',
  imports: [MagaryTabs, MagaryTab],
  templateUrl: './view-tab.html',
  styleUrl: './view-tab.scss',
})
export class ViewTab {
  importExample = "import { MagaryTabs, MagaryTab } from 'ng-magary';";
}
