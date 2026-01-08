import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  signal,
  computed,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  HostListener,
  NgModule,
  input,
  model,
  output,
  viewChild,
  contentChildren,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  LucideAngularModule,
  Play,
  Pause,
  Maximize,
  Minimize,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  MonitorPlay,
} from 'lucide-angular';

export interface GalleriaItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  type?: 'image' | 'video';
  videoUrl?: string;
}

export interface GalleriaResponsiveOptions {
  breakpoint: string;
  numVisible: number;
}

@NgModule({
  imports: [
    LucideAngularModule.pick({
      Play,
      Pause,
      Maximize,
      Minimize,
      Download,
      Share2,
      ZoomIn,
      ZoomOut,
      RotateCcw,
      ChevronLeft,
      ChevronRight,
      X,
      MonitorPlay,
    }),
  ],
  exports: [LucideAngularModule],
})
export class GalleriaIconsModule {}

@Component({
  selector: 'magary-galleria',
  standalone: true,
  imports: [CommonModule, GalleriaIconsModule],
  templateUrl: './galleria.html',
  styleUrls: ['./galleria.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-galleria',
    '[class.magary-galleria-thumbnails-left]':
      'thumbnailsPosition() === "left"',
    '[class.magary-galleria-thumbnails-right]':
      'thumbnailsPosition() === "right"',
    '[class.magary-galleria-thumbnails-top]': 'thumbnailsPosition() === "top"',
    '[class.magary-galleria-thumbnails-bottom]':
      'thumbnailsPosition() === "bottom"',
    '[class.magary-galleria-fullscreen]': 'isFullscreen()',
    '[class.magary-galleria-presentation-mode]': 'presentationMode()',
    '[style.width]': '"100%"',
    '[style.max-width]': 'width()',
  },
})
export class MagaryGalleria implements OnInit, OnDestroy, AfterViewInit {
  // Core inputs
  value = input<GalleriaItem[]>([]);
  activeIndex = model<number>(0);
  responsiveOptions = input<GalleriaResponsiveOptions[]>([]);

  // Display options
  showItemNavigators = input<boolean>(true);
  showThumbnailNavigators = input<boolean>(true);
  showItemNavigatorsOnHover = input<boolean>(false);
  showThumbnails = input<boolean>(true);
  thumbnailsPosition = input<'bottom' | 'top' | 'left' | 'right'>('bottom');
  showIndicators = input<boolean>(false);
  showIndicatorsOnItem = input<boolean>(false);
  indicatorPosition = input<'bottom' | 'top' | 'left' | 'right'>('bottom');

  // Behavior options
  circular = input<boolean>(true);
  autoPlay = input<boolean>(false);
  transitionInterval = input<number>(4000);
  changeItemOnIndicatorHover = input<boolean>(false);

  // Premium features
  showFullScreenButton = input<boolean>(true);
  showDownloadButton = input<boolean>(true);
  showShareButton = input<boolean>(true);
  showProgressBar = input<boolean>(true);
  showImageCounter = input<boolean>(true);
  showPlayPauseButton = input<boolean>(true);

  // Advanced features
  enableZoom = input<boolean>(true);
  maxZoomLevel = input<number>(3);
  enableSwipe = input<boolean>(true);
  enableKeyboardNavigation = input<boolean>(true);
  enableDoubleClickZoom = input<boolean>(true);
  enablePinchZoom = input<boolean>(true);

  // Transitions & effects
  transitionEffect = input<'fade' | 'slide' | 'zoom' | 'flip'>('fade');
  transitionDuration = input<number>(500);

  // Loading & performance
  lazyLoad = input<boolean>(true);
  preloadRange = input<number>(2);
  showLoadingSpinner = input<boolean>(true);

  // Captions & metadata
  captionPosition = input<'bottom' | 'overlay' | 'outside'>('overlay');
  showCaption = input<boolean>(true);

  // Presentation mode
  allowPresentationMode = input<boolean>(true);
  presentationAutoPlay = input<boolean>(true);

  // Styling
  containerStyle = input<any>();
  containerClass = input<string | undefined>();
  theme = input<'light' | 'dark' | 'auto'>('dark');
  accentColor = input<string>('#3b82f6');
  width = input<string | undefined>();

  // Outputs
  // activeIndexChange is handled by model() signal `activeIndex`
  onImageClick = output<any>();
  onFullScreenChange = output<boolean>();
  onImageLoad = output<any>();
  onImageError = output<any>();
  onShare = output<any>();
  onDownload = output<any>();

  // Queries
  templates = contentChildren(TemplateRef);
  containerRef = viewChild<ElementRef>('galleriaContainer');
  currentImageRef = viewChild<ElementRef>('currentImage');

  // Templates Inputs
  itemTemplateRef = input<TemplateRef<any> | undefined>();
  thumbnailTemplateRef = input<TemplateRef<any> | undefined>();
  captionTemplateRef = input<TemplateRef<any> | undefined>();

  // Internal Signals
  isFullscreen = signal<boolean>(false);
  isZoomed = signal<boolean>(false);
  zoomLevel = signal<number>(1);
  progressValue = signal<number>(0);
  isHovering = signal<boolean>(false);
  isPlaying = signal<boolean>(false);
  presentationMode = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  loadedImages = signal<Set<number>>(new Set());

  // Zoom & pan
  private panX = signal<number>(0);
  private panY = signal<number>(0);
  private isPanning = false;
  private lastPanX = 0;
  private lastPanY = 0;

  // Touch/Swipe
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartY: number = 0;
  private touchEndY: number = 0;
  private minSwipeDistance = 50;
  private pinchDistance = 0;

  // Intervals
  interval: any;
  progressInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Initial sync not strictly needed with model(), but if logic depends on side effects, use effect()
    if (this.autoPlay()) {
      this.startSlideShow();
    }
  }

  ngAfterViewInit() {
    this.applyTheme();
  }

  // Computed properties
  activeItem = computed(() => {
    const val = this.value();
    const idx = this.activeIndex();
    return val && val.length > 0 ? val[idx] : undefined;
  });

  imageCounter = computed(() => {
    const total = this.value() ? this.value().length : 0;
    return `${this.activeIndex() + 1} / ${total}`;
  });

  canGoPrev = computed(() => {
    return this.circular() || this.activeIndex() > 0;
  });

  canGoNext = computed(() => {
    const val = this.value();
    if (!val || val.length === 0) return false;
    return this.circular() || this.activeIndex() < val.length - 1;
  });

  transformStyle = computed(() => {
    const zoom = this.zoomLevel();
    const panX = this.panX();
    const panY = this.panY();
    return `scale(${zoom}) translate(${panX}px, ${panY}px)`;
  });

  // Navigation
  next() {
    const val = this.value();
    if (!this.canGoNext() || !val || val.length === 0) return;

    let nextIndex = this.activeIndex() + 1;
    if (nextIndex >= val.length) {
      nextIndex = this.circular() ? 0 : val.length - 1;
    }
    this.navigateToIndex(nextIndex);
  }

  prev() {
    const val = this.value();
    if (!this.canGoPrev() || !val || val.length === 0) return;

    let prevIndex = this.activeIndex() - 1;
    if (prevIndex < 0) {
      prevIndex = this.circular() ? val.length - 1 : 0;
    }
    this.navigateToIndex(prevIndex);
  }

  navigateToIndex(index: number) {
    if (index === this.activeIndex()) return;

    this.resetZoom();
    this.activeIndex.set(index);
    // Model automatically emits activeIndexChange to parent if bound

    this.resetProgress();
    this.preloadNearbyImages(index);
  }

  onThumbnailClick(index: number) {
    const wasPlaying = this.isPlaying();
    this.stopSlideShow();
    this.navigateToIndex(index);
    if (wasPlaying && this.autoPlay()) {
      this.startSlideShow();
    }
  }

  onIndicatorClick(index: number) {
    const wasPlaying = this.isPlaying();
    this.stopSlideShow();
    this.navigateToIndex(index);
    if (wasPlaying && this.autoPlay()) {
      this.startSlideShow();
    }
  }

  onItemClick(item: any) {
    this.onImageClick.emit({ item, index: this.activeIndex() });
  }

  // Slideshow control
  startSlideShow() {
    this.stopSlideShow();
    this.isPlaying.set(true);

    if (isPlatformBrowser(this.platformId)) {
      this.resetProgress();

      if (this.showProgressBar()) {
        const interval = this.transitionInterval();
        const progressStep = 100 / (interval / 50);
        this.progressInterval = setInterval(() => {
          const current = this.progressValue();
          if (current >= 100) {
            this.progressValue.set(0);
          } else {
            this.progressValue.set(current + progressStep);
          }
        }, 50);
      }

      this.interval = setInterval(() => {
        this.next();
      }, this.transitionInterval());
    }
  }

  stopSlideShow() {
    this.isPlaying.set(false);
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  togglePlayPause() {
    if (this.isPlaying()) {
      this.stopSlideShow();
    } else {
      this.startSlideShow();
    }
  }

  resetProgress() {
    this.progressValue.set(0);
  }

  // Fullscreen
  toggleFullScreen() {
    if (isPlatformBrowser(this.platformId)) {
      const newState = !this.isFullscreen();
      this.isFullscreen.set(newState);
      this.onFullScreenChange.emit(newState);

      if (newState) {
        const elem = this.containerRef()?.nativeElement;
        if (elem?.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem?.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem?.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        }
      }
    }
  }

  // Presentation mode
  togglePresentationMode() {
    if (!this.allowPresentationMode()) return;

    const newState = !this.presentationMode();
    this.presentationMode.set(newState);

    if (newState) {
      this.toggleFullScreen();
      if (this.presentationAutoPlay()) {
        this.startSlideShow();
      }
    } else {
      if (this.isFullscreen()) {
        this.toggleFullScreen();
      }
      this.stopSlideShow();
    }
  }

  // Zoom functionality
  toggleZoom() {
    if (!this.enableZoom()) return;

    const currentZoom = this.zoomLevel();
    if (currentZoom === 1) {
      this.zoomLevel.set(2);
      this.isZoomed.set(true);
    } else {
      this.resetZoom();
    }
  }

  zoomIn() {
    if (!this.enableZoom()) return;
    const current = this.zoomLevel();
    const max = this.maxZoomLevel();
    if (current < max) {
      this.zoomLevel.set(Math.min(current + 0.5, max));
      this.isZoomed.set(true);
    }
  }

  zoomOut() {
    if (!this.enableZoom()) return;
    const current = this.zoomLevel();
    if (current > 1) {
      this.zoomLevel.set(Math.max(current - 0.5, 1));
      if (this.zoomLevel() === 1) {
        this.isZoomed.set(false);
        this.resetPan();
      }
    }
  }

  resetZoom() {
    this.zoomLevel.set(1);
    this.isZoomed.set(false);
    this.resetPan();
  }

  resetPan() {
    this.panX.set(0);
    this.panY.set(0);
  }

  onImageDoubleClick() {
    if (this.enableDoubleClickZoom()) {
      this.toggleZoom();
    }
  }

  // Mouse pan for zoomed images
  onMouseDown(event: MouseEvent) {
    if (this.isZoomed()) {
      this.isPanning = true;
      this.lastPanX = event.clientX;
      this.lastPanY = event.clientY;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isPanning && this.isZoomed()) {
      const deltaX = event.clientX - this.lastPanX;
      const deltaY = event.clientY - this.lastPanY;

      this.panX.set(this.panX() + deltaX);
      this.panY.set(this.panY() + deltaY);

      this.lastPanX = event.clientX;
      this.lastPanY = event.clientY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isPanning = false;
  }

  // Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.enableKeyboardNavigation()) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Escape':
        if (this.presentationMode()) {
          this.togglePresentationMode();
        } else if (this.isFullscreen()) {
          this.toggleFullScreen();
        }
        if (this.isZoomed()) {
          this.resetZoom();
        }
        break;
      case ' ':
        event.preventDefault();
        this.togglePlayPause();
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.zoomIn();
        break;
      case '-':
      case '_':
        event.preventDefault();
        this.zoomOut();
        break;
      case '0':
        event.preventDefault();
        this.resetZoom();
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        this.toggleFullScreen();
        break;
      case 'p':
      case 'P':
        event.preventDefault();
        this.togglePresentationMode();
        break;
    }
  }

  @HostListener('document:fullscreenchange')
  onFullScreenChangeHandler() {
    const isFull = !!document.fullscreenElement;
    this.isFullscreen.set(isFull);

    // If we exited fullscreen and we were in presentation mode, exit presentation mode too
    if (!isFull && this.presentationMode()) {
      this.presentationMode.set(false);
      this.stopSlideShow();
    }
  }

  // Touch/Swipe support
  onTouchStart(event: TouchEvent) {
    if (!this.enableSwipe()) return;

    if (event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    } else if (event.touches.length === 2 && this.enablePinchZoom()) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      this.pinchDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );
    }
  }

  onTouchMove(event: TouchEvent) {
    if (
      event.touches.length === 2 &&
      this.enablePinchZoom() &&
      this.isZoomed()
    ) {
      event.preventDefault();
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY,
      );

      const scale = distance / this.pinchDistance;
      const newZoom = this.zoomLevel() * scale;
      // maxZoomLevel()
      this.zoomLevel.set(Math.max(1, Math.min(newZoom, this.maxZoomLevel())));
      this.pinchDistance = distance;
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.enableSwipe() || event.touches.length > 0) return;

    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  handleSwipe() {
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;

    if (
      Math.abs(diffX) > Math.abs(diffY) &&
      Math.abs(diffX) > this.minSwipeDistance
    ) {
      if (diffX > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  // Share functionality
  async shareImage() {
    const item = this.activeItem();
    if (!item) return;

    this.onShare.emit({ item, index: this.activeIndex() });

    if (isPlatformBrowser(this.platformId) && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: item.title || 'Image',
          text: item.description || '',
          url: item.src,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      this.copyToClipboard(item.src);
    }
  }

  // Download functionality
  downloadImage() {
    const item = this.activeItem();
    if (!item) return;

    this.onDownload.emit({ item, index: this.activeIndex() });

    if (isPlatformBrowser(this.platformId)) {
      const link = document.createElement('a');
      link.href = item.src;
      link.download = item.title || `image-${this.activeIndex() + 1}`;
      link.click();
    }
  }

  copyToClipboard(text: string) {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }

  // Lazy loading
  shouldLoadImage(index: number): boolean {
    if (!this.lazyLoad() || !this.value()) return true;
    if (this.loadedImages().has(index)) return true;

    const currentIndex = this.activeIndex();
    return Math.abs(index - currentIndex) <= this.preloadRange();
  }

  preloadNearbyImages(centerIndex: number) {
    if (!this.lazyLoad() || !this.value()) return;

    const loaded = new Set(this.loadedImages());
    for (let i = -this.preloadRange(); i <= this.preloadRange(); i++) {
      const index = centerIndex + i;
      if (index >= 0 && index < this.value().length) {
        loaded.add(index);
      }
    }
    this.loadedImages.set(loaded);
  }

  onImageLoadSuccess(index: number) {
    this.isLoading.set(false);
    if (this.value() && this.value()[index]) {
      this.onImageLoad.emit({ index, item: this.value()[index] });
    }
  }

  onImageLoadError(index: number) {
    this.isLoading.set(false);
    if (this.value() && this.value()[index]) {
      this.onImageError.emit({ index, item: this.value()[index] });
    }
  }

  // Hover state
  onMouseEnter() {
    this.isHovering.set(true);
    if (
      this.showItemNavigatorsOnHover() &&
      this.autoPlay() &&
      !this.presentationMode()
    ) {
      this.stopSlideShow();
    }
  }

  onMouseLeave() {
    this.isHovering.set(false);
    if (
      this.showItemNavigatorsOnHover() &&
      this.autoPlay() &&
      !this.presentationMode()
    ) {
      this.startSlideShow();
    }
  }

  // Theme
  applyTheme() {
    if (isPlatformBrowser(this.platformId) && this.containerRef()) {
      const element = this.containerRef()!.nativeElement;
      element.style.setProperty('--galleria-accent-color', this.accentColor());
    }
  }

  ngOnDestroy() {
    this.stopSlideShow();
  }
}
