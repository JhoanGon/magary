import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryButton, MagaryCard } from 'ng-magary';

@Component({
  selector: 'mg-premium-hero-1',
  standalone: true,
  imports: [CommonModule, MagaryButton, MagaryCard],
  templateUrl: './hero-1.component.html',
  styleUrl: './hero-1.component.scss'
})
export class Hero1Component {
  // Logic specifically for the Hero can go here
  getStarted() {
    console.log('Get Started clicked');
  }

  viewDocs() {
    console.log('View Docs clicked');
  }
}
