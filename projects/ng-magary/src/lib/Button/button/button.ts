import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'magary-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class MagaryButton {
  public label = input<string>();
  public icon = input<string>();
  public shadow = input<number>(0);
  public rounded = input<boolean>(false);
  public customBackgroundColor = input<string>();
  public iconPos = input<'left' | 'right'>('left');
  public severity = input<
    'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help'
  >();
  public loading = input<boolean>(false);
  public disabled = input<boolean>(false);
  public variant = input<'solid' | 'text' | 'outlined'>('solid');
  public buttonClick = output<Event>();
}
