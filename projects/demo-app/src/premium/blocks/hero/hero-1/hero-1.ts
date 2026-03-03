import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'magary-hero-1',
  imports: [],
  templateUrl: './hero-1.html',
  styleUrl: './hero-1.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1 {}
