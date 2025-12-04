import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'magary-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'styles().width',
    '[style.height]': 'styles().height',
    '[style.border-radius]': 'styles()["border-radius"]',
    '[class.skeleton-circle]': 'shape() === "circle"',
    '[class.skeleton-rectangle]': 'shape() === "rectangle"',
    '[class.skeleton-animation-shimmer]': 'animation() === "shimmer"',
    '[class.skeleton-animation-none]': 'animation() === "none"',
    '[class]': 'styleClass()',
  },
})
export class MagarySkeleton {
  shape = input<'rectangle' | 'circle'>('rectangle');
  size = input<string | null>(null);
  width = input<string>('100%');
  height = input<string>('1rem');
  borderRadius = input<string>('4px');
  animation = input<'shimmer' | 'none'>('shimmer');
  styleClass = input<string>('');

  readonly styles = computed(() => {
    const sizeVal = this.size();
    if (sizeVal) {
      return {
        width: sizeVal,
        height: sizeVal,
        'border-radius':
          this.shape() === 'circle' ? '50%' : this.borderRadius(),
      };
    }

    return {
      width: this.width(),
      height: this.height(),
      'border-radius': this.shape() === 'circle' ? '50%' : this.borderRadius(),
    };
  });
}
