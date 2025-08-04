import { Component } from '@angular/core';
import { MagaryButton } from 'ng-magary';

@Component({
  selector: 'magary-view-button',
  imports: [MagaryButton],
  templateUrl: './view-button.html',
  styleUrl: './view-button.scss',
})
export class ViewButton {
  importExample = "import { MagaryButton } from 'ng-magary';";
}
