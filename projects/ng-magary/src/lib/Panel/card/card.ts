import { CommonModule, NgOptimizedImage } from '@angular/common';
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
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
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
  readonly imageSize = input<string>('200px'); // Default adjusted for better initial look
  readonly backgroundColor = input<string>();
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
  readonly hoverEffect = input<boolean>(true);

  // New Features
  readonly badge = input<string>();
  readonly badgeColor = input<string>('var(--primary-500, #0066cc)');
  readonly border = input<string>();

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
      !this.hoverEffect() ? 'no-hover' : '',
    ].filter(Boolean),
  );

  readonly cardStyles = computed(() => {
    const userBg = this.backgroundColor();
    const defaultBg =
      this.variant() === 'filled' ? 'var(--surface-100, #f3f4f6)' : '#fff';

    return {
      width: this.width(),
      height: this.height(),
      '--card-bg': userBg ?? defaultBg,
      '--card-radius': this.borderRadius(),
      '--card-gap': this.gap(),
      '--card-padding': this.padding(),
      '--img-size': this.imageSize(),
      '--badge-color': this.badgeColor(),
      ...(this.border() ? { border: this.border() } : {}),
      cursor: this.clickable() && !this.disabled() ? 'pointer' : 'default',
      opacity: this.disabled() ? '0.6' : '1',
      'pointer-events': this.disabled() ? 'none' : 'auto',
    };
  });

  readonly imageStyles = computed(() => ({
    'object-fit': this.imageFit(),
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
