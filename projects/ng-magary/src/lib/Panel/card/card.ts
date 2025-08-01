import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'magary-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  public type = input<'info' | 'warning' | 'success' | 'error'>('info');
  public img = input<string | undefined>();
  public positionImage = input<'left' | 'right' | 'top' | 'bottom'>('top');
  public shadow = input<number>(1);
  public width = input<string>('auto');
  public height = input<string>('auto');

}
