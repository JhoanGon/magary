import { Component } from '@angular/core';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  selector: 'magary-view-card',
  imports: [MagaryCard, MagaryButton],
  templateUrl: './view-card.html',
  styleUrl: './view-card.scss',
})
export class ViewCard {
  importExample = "import { MagaryCard } from 'ng-magary';";
}
