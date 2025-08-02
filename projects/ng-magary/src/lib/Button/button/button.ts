import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'magary-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public label = input<string>();
  public icon = input<string>();
  public shadow = input<number>(0);
  public rounded = input<boolean>(false);
  public iconPos = input<'left' | 'right'>('left');
  public severity = input<
    'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'help'
  >();
  public loading = input<boolean>(false);
  public disabled = input<boolean>(false);
  public variant = input<'solid' | 'text' | 'outlined'>('solid');
}
