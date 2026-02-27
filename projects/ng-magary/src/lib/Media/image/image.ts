import {
  Component,
  input,
  output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';

import { CommonModule, NgStyle } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'magary-image',
  standalone: true,
  imports: [CommonModule, NgStyle, LucideAngularModule],
  templateUrl: './image.html',
  styleUrls: ['./image.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-image',
  },
})
export class MagaryImage implements OnDestroy {
  private dialog = viewChild<ElementRef<HTMLDialogElement>>('previewDialog');
  private destroyed = false;

  src = input<string | undefined>(undefined);

  alt = input<string | undefined>(undefined);

  width = input<string | undefined>(undefined);

  height = input<string | undefined>(undefined);

  objectFit = input<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>(
    'cover',
  );

  loading = input<'lazy' | 'eager'>('lazy');

  preview = input<boolean>(false);

  onLoad = output<Event>();

  onError = output<Event>();

  loaded: boolean = false;

  error: boolean = false;

  private emitLoad(event: Event): void {
    if (!this.destroyed) {
      this.onLoad.emit(event);
    }
  }

  private emitError(event: Event): void {
    if (!this.destroyed) {
      this.onError.emit(event);
    }
  }

  onImageLoad(event: Event) {
    this.loaded = true;
    this.emitLoad(event);
  }

  onImageError(event: Event) {
    this.error = true;
    this.emitError(event);
  }

  rotate = signal<number>(0);

  scale = signal<number>(1);

  onPreviewImageClick(event: Event) {
    event.stopPropagation();
    if (this.preview()) {
      this.dialog()?.nativeElement.showModal();
    }
  }

  closePreview() {
    this.dialog()?.nativeElement.close();
    this.rotate.set(0);
    this.scale.set(1);
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.dialog()?.nativeElement?.open) {
      this.dialog()?.nativeElement.close();
    }
  }

  zoomIn() {
    this.scale.update((s) => s + 0.1);
  }

  zoomOut() {
    if (this.scale() > 0.5) {
      this.scale.update((s) => s - 0.1);
    }
  }

  rotateRight() {
    this.rotate.update((r) => r + 90);
  }

  rotateLeft() {
    this.rotate.update((r) => r - 90);
  }

  download() {
    const src = this.src();
    if (src) {
      const link = document.createElement('a');
      link.href = src;
      link.download = this.alt() || 'image';
      link.click();
    }
  }

  imagePreviewStyle = computed(() => ({
    transform: `rotate(${this.rotate()}deg) scale(${this.scale()})`,
  }));
}
