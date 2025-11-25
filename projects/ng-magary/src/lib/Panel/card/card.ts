import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
type ImagePosition = 'left' | 'right' | 'top' | 'bottom';
type ShadowLevel = 0 | 1 | 2 | 3 | 4 | 5;
type CardVariant = 'elevated' | 'outlined' | 'filled';
@Component({
  selector: 'magary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryCard {
  readonly img = input<string>();
  readonly positionImage = input<ImagePosition>('top');
  readonly shadow = input<ShadowLevel>(1);
  readonly width = input<string>('250px');
  readonly height = input<string>('auto');
  readonly padding = input<string>('1rem');
  readonly gap = input<string>('1rem');
  readonly borderRadius = input<string>('0.75rem');
  readonly imageSize = input<string>('500px');
  readonly backgroundColor = input<string>('#fff');
  readonly responsive = input<boolean>(true);
  readonly altText = input<string>('Card image');
  readonly imageFit = input<
    'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  >('cover');
  readonly clickable = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly variant = input<CardVariant>('elevated');
  readonly loadingText = input<string>('Cargando...');
  readonly cardClasses = computed(() =>
    [
      'card',
      `shadow-${this.shadow()}`,
      `layout-${this.positionImage()}`,
      `variant-${this.variant()}`,
      this.responsive() ? 'responsive' : '',
      this.clickable() ? 'clickable' : '',
      this.loading() ? 'loading' : '',
      this.disabled() ? 'disabled' : '',
    ].filter(Boolean),
  );
  readonly cardStyles = computed(() => ({
    width: this.width(),
    height: this.height(),
    'border-radius': this.borderRadius(),
    'background-color': this.backgroundColor(),
    '--border-radius': this.borderRadius(),
    '--gap': this.gap(),
    '--padding': this.padding(),
    cursor: this.clickable() && !this.disabled() ? 'pointer' : 'default',
    opacity: this.disabled() ? '0.6' : '1',
    'pointer-events': this.disabled() ? 'none' : 'auto',
  }));
  readonly imageWidth = computed((): string => {
    if (this.positionImage() === 'left' || this.positionImage() === 'right') {
      return `calc(${this.width()} / 2)`;
    }
    return '100%';
  });
  readonly imageHeight = computed((): string => {
    if (this.positionImage() === 'top' || this.positionImage() === 'bottom') {
      return `calc(${this.imageSize()} / 2)`;
    }
    return '100%';
  });
  readonly imageClasses = computed(() => [
    'card-img',
    `img-${this.positionImage()}`,
  ]);
  readonly imageBorderRadius = computed((): Record<string, string> => {
    const radius = this.borderRadius();
    const pos = this.positionImage();
    const radiusMap: Record<ImagePosition, Record<string, string>> = {
      top: {
        'border-top-left-radius': radius,
        'border-top-right-radius': radius,
      },
      bottom: {
        'border-bottom-left-radius': radius,
        'border-bottom-right-radius': radius,
      },
      left: {
        'border-top-left-radius': radius,
        'border-bottom-left-radius': radius,
      },
      right: {
        'border-top-right-radius': radius,
        'border-bottom-right-radius': radius,
      },
    };
    return radiusMap[pos] || {};
  });
  readonly imageStyles = computed(() => ({
    width: this.imageWidth(),
    height: this.imageHeight(),
    'object-fit': this.imageFit(),
    ...this.imageBorderRadius(),
  }));
  readonly hasImage = computed(() => Boolean(this.img()));
  readonly isHorizontalLayout = computed(
    () => this.positionImage() === 'left' || this.positionImage() === 'right',
  );
  readonly isInteractive = computed(
    () => this.clickable() && !this.disabled() && !this.loading(),
  );
  readonly showLoadingOverlay = computed(() => this.loading());
  onCardClick(event: Event) {
    if (this.isInteractive()) {
      const cardClickEvent = new CustomEvent('cardClick', {
        detail: { event },
        bubbles: true,
      });
      (event.target as HTMLElement).dispatchEvent(cardClickEvent);
    }
  }
  onCardKeydown(event: KeyboardEvent) {
    if (this.isInteractive() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onCardClick(event);
    }
  }
}
