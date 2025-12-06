import {
  Component,
  input,
  output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'magary-image',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './image.html',
  styleUrls: ['./image.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-image',
  },
})
export class MagaryImage {
  src = input<string | undefined>(undefined);

  alt = input<string | undefined>(undefined);

  width = input<string | undefined>(undefined);

  height = input<string | undefined>(undefined);

  loading = input<'lazy' | 'eager'>('lazy');

  preview = input<boolean>(false);

  onLoad = output<Event>();

  onError = output<Event>();

  loaded: boolean = false;

  error: boolean = false;

  previewVisible: boolean = false;

  onImageLoad(event: Event) {
    this.loaded = true;
    this.onLoad.emit(event);
  }

  onImageError(event: Event) {
    this.error = true;
    this.onError.emit(event);
  }

  rotate: number = 0;

  scale: number = 1;

  onPreviewImageClick(event: Event) {
    event.stopPropagation();
    if (this.preview()) {
      this.previewVisible = true;
    }
  }

  closePreview() {
    this.previewVisible = false;
    this.rotate = 0;
    this.scale = 1;
  }

  zoomIn() {
    this.scale = this.scale + 0.1;
  }

  zoomOut() {
    if (this.scale > 0.5) {
      this.scale = this.scale - 0.1;
    }
  }

  rotateRight() {
    this.rotate = this.rotate + 90;
  }

  rotateLeft() {
    this.rotate = this.rotate - 90;
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

  imagePreviewStyle() {
    return {
      transform: 'rotate(' + this.rotate + 'deg) scale(' + this.scale + ')',
    };
  }
}
