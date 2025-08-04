import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'magary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class MagaryCard {
  public img = input<string | undefined>();
  public positionImage = input<'left' | 'right' | 'top' | 'bottom'>('top');
  public shadow = input<number>(1);
  public width = input<string>('250px');
  public padding = input<string>('1rem');
  public gap = input<string>('1rem');
  public borderRadius = input<string>('0.75rem');
  public imageSize = input<string>('500px');
  public backgroundColor = input<string>('#fff');

  public imageWidth(): string {
    if (this.positionImage() === 'left' || this.positionImage() === 'right') {
      return `calc(${this.width()} / 2)`;
    }
    return '100%';
  }

  public imageHeight(): string {
    if (this.positionImage() === 'top' || this.positionImage() === 'bottom') {
      return `calc(${this.imageSize()} / 2)`;
    }
    return '100%';
  }

  public imageBorderRadius(): Record<string, string> {
    const radius = this.borderRadius();
    const pos = this.positionImage();

    switch (pos) {
      case 'top':
        return {
          'border-top-left-radius': radius,
          'border-top-right-radius': radius,
        };
      case 'bottom':
        return {
          'border-bottom-left-radius': radius,
          'border-bottom-right-radius': radius,
        };
      case 'left':
        return {
          'border-top-left-radius': radius,
          'border-bottom-left-radius': radius,
        };
      case 'right':
        return {
          'border-top-right-radius': radius,
          'border-bottom-right-radius': radius,
        };
      default:
        return {};
    }
  }
}
