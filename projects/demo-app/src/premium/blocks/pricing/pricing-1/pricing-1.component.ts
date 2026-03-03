import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  selector: 'mg-premium-pricing-1',
  standalone: true,
  imports: [CommonModule, MagaryButton, MagaryCard],
  templateUrl: './pricing-1.component.html',
  styleUrl: './pricing-1.component.scss'
})
export class Pricing1Component {
  getStarted(tier: string) {
    console.log(`Selected ${tier} tier`);
  }
}
