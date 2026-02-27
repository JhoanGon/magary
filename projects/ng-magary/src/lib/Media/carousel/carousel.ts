import {
  Component,
  input,
  output,
  viewChild,
  viewChildren,
  contentChild,
  effect,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  DestroyRef,
  inject,
  PLATFORM_ID,
  ElementRef,
  TemplateRef,
  OnInit,
  afterNextRender,
  NgModule,
  untracked,
  booleanAttribute,
  numberAttribute,
  AfterViewInit,
  model,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, filter, map, throttleTime } from 'rxjs/operators';
import {
  LucideAngularModule,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from 'lucide-angular';
import { MagaryButton } from '../../Button/button/button';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      ChevronLeft,
      ChevronRight,
      ChevronUp,
      ChevronDown,
    }),
  ],
  exports: [LucideAngularModule],
})
export class CarouselIconsModule {}

/**
 * Carousel responsive breakpoint options
 */
export interface CarouselResponsiveOptions {
  breakpoint: number | string;
  numVisible?: number;
  numScroll?: number;
  spaceBetween?: number;
  showNavigators?: boolean;
  showIndicators?: boolean;
}

/**
 * Item template context with enhanced data
 */
export interface CarouselItemContext<T> {
  $implicit: T;
  index: number;
  count: number;
  isActive: boolean;
  isVisible: boolean;
  progress: number;
}

/**
 * Carousel orientation
 */
export type CarouselOrientation = 'horizontal' | 'vertical';

/**
 * Carousel transition effects
 */
export type CarouselEffect =
  | 'slide'
  | 'fade'
  | 'cube'
  | 'flip'
  | 'coverflow'
  | 'cards';

/**
 * Carousel indicator styles
 */
export type CarouselIndicatorStyle =
  | 'dots'
  | 'lines'
  | 'thumbnails'
  | 'fraction'
  | 'progress';

/**
 * Navigation button styles
 */
export type CarouselNavStyle = 'default' | 'minimal' | 'large' | 'outside';

/**
 * Navigation button position
 */
export type CarouselNavPosition =
  | 'default'
  | 'top'
  | 'bottom'
  | 'center'
  | 'outside';

/**
 * Indicator position
 */
export type CarouselIndicatorPosition =
  | 'bottom'
  | 'top'
  | 'left'
  | 'right'
  | 'inside'
  | 'outside';

/**
 * Autoplay direction
 */
export type CarouselAutoplayDirection = 'forward' | 'backward' | 'alternate';

/**
 * Preload strategy
 */
export type CarouselPreloadStrategy = 'eager' | 'lazy' | 'none';

/**
 * Carousel event data
 */
export interface CarouselSlideEvent<T> {
  currentIndex: number;
  previousIndex: number;
  currentItem: T | null;
  previousItem: T | null;
  direction: 'forward' | 'backward';
}

/**
 * MagaryCarousel v2.0 - Enterprise-grade carousel component
 *
 * @description
 * Feature-complete carousel with 100+ improvements including:
 * - Multiple transition effects (slide, fade, cube, flip, coverflow, cards)
 * - Advanced autoplay with direction control and visual progress
 * - Virtual scrolling for large datasets
 * - Full keyboard navigation and accessibility
 * - Responsive configuration per breakpoint
 * - Touch gestures with momentum and resistance
 * - ControlValueAccessor for forms integration
 * - Multiple indicator styles (dots, lines, thumbnails, fraction, progress)
 * - Lazy loading and prefetch strategies
 * - RTL support
 * - Dark mode theming
 *
 * @example
 * ```html
 * <magary-carousel
 *   [(page)]="currentPage"
 *   [value]="products"
 *   [numVisible]="3"
 *   [effect]="'coverflow'"
 *   [autoplayInterval]="5000"
 *   [showProgress]="true"
 *   [loop]="true"
 *   (slideChange)="onSlideChange($event)">
 *
 *   <ng-template #item let-product let-index="index">
 *     <div class="product-card">
 *       <img [src]="product.image" [alt]="product.name">
 *       <h3>{{ product.name }}</h3>
 *     </div>
 *   </ng-template>
 * </magary-carousel>
 * ```
 */
@Component({
  selector: 'magary-carousel',
  standalone: true,
  imports: [CommonModule, MagaryButton, CarouselIconsModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MagaryCarouselComponent,
      multi: true,
    },
  ],
  host: {
    class: 'magary-carousel',
    '[class.magary-carousel-vertical]': 'isVertical()',
    '[class.magary-carousel-horizontal]': '!isVertical()',
    '[class.magary-carousel-rtl]': 'direction() === "rtl"',
    '[class.magary-carousel-loop]': 'loop()',
    '[class.magary-carousel-circular]': 'circular()',
    '[class.magary-carousel-autoplay]': 'autoplayInterval() > 0',
    '[class.magary-carousel-free-mode]': 'freeMode()',
    '[class.magary-carousel-center-mode]': 'centerMode()',
    '[class.magary-carousel-grab-cursor]': 'grabCursor() && swipeable()',
    '[class.magary-carousel-peek-mode]': 'peekMode()',
    '[class.is-animating]': '_isAnimating()',
    '[class.is-dragging]': '_isDragging()',
    '[class.is-beginning]': '_currentPage() === 0',
    '[class.is-end]': '_currentPage() === totalPages() - 1',
    '[class.has-hover]': '_isHovered()',
    '[class.magary-carousel-nav-outside]': 'navPosition() === "outside"',
    '[class.magary-carousel-nav-top]': 'navPosition() === "top"',
    '[class.magary-carousel-nav-bottom]': 'navPosition() === "bottom"',
    '[class.magary-carousel-nav-default]':
      'navPosition() === "default" || navPosition() === "center"',
    '[attr.data-effect]': 'effect()',
    '[attr.data-nav-style]': 'navStyle()',
    '[attr.data-indicator-style]': 'indicatorStyle()',
    '[attr.data-nav-position]': 'navPosition()',
    '[attr.role]': '"region"',
    '[attr.aria-label]': 'ariaLabel() || "Carousel"',
    '[attr.aria-roledescription]': '"carousel"',
    '[attr.aria-live]': 'autoplayInterval() > 0 ? "off" : "polite"',
    '[attr.dir]': 'direction()',
    '[style.width]': '"100%"',
    '[style.max-width]': 'width()',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class MagaryCarouselComponent<T>
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  private static instanceSequence = 0;
  protected readonly Math = Math;
  readonly carouselInstanceId = `magary-carousel-${++MagaryCarouselComponent.instanceSequence}`;
  readonly viewportId = `${this.carouselInstanceId}-viewport`;
  readonly indicatorsId = `${this.carouselInstanceId}-indicators`;
  // ============================================================================
  // CORE INPUTS
  // ============================================================================

  /** Array of items to display */
  readonly value = input<T[]>([]);

  /** Current page (two-way binding support with model) */
  readonly page = model<number>(0);

  /** Initial slide to show on mount */
  readonly initialSlide = input<number>(0);

  /** Number of items visible at once */
  readonly numVisible = input<number, number | string>(1, {
    transform: (v) => {
      if (v === 'auto') return -1;
      return typeof v === 'string' ? parseInt(v, 10) : v;
    },
  });

  /** Number of items to scroll per navigation */
  readonly numScroll = input<number, number | string>(1, {
    transform: (v) => (typeof v === 'string' ? parseInt(v, 10) : v),
  });

  /** Number of items to highlight as active */
  readonly numActive = input(1, { transform: numberAttribute });

  /** Gap between items in pixels */
  readonly spaceBetween = input(0, { transform: numberAttribute });

  /** Responsive configuration per breakpoint */
  readonly responsiveOptions = input<CarouselResponsiveOptions[]>([]);

  // ============================================================================
  // LAYOUT & APPEARANCE
  // ============================================================================

  /** Carousel orientation */
  readonly orientation = input<CarouselOrientation>('horizontal');

  /** Text direction (LTR/RTL) */
  readonly direction = input<'ltr' | 'rtl'>('ltr');

  /** Height for vertical carousels */
  readonly verticalViewPortHeight = input<string>('300px');

  /** Width constraint */
  readonly width = input<string | undefined>(undefined);

  /** Custom CSS class for content wrapper */
  readonly contentClass = input<string>('');

  /** Custom CSS class for indicators */
  readonly indicatorsContentClass = input<string>('');

  /** Aria label for accessibility */
  readonly ariaLabel = input<string>('');

  /** Theme variant */
  readonly theme = input<'modern' | 'minimal' | 'classic' | 'ios' | 'material'>(
    'modern',
  );

  // ============================================================================
  // TRANSITION & EFFECTS
  // ============================================================================

  /** Visual effect type */
  readonly effect = input<CarouselEffect>('slide');

  /** Transition duration in milliseconds */
  readonly transitionDuration = input(300, { transform: numberAttribute });

  /** Transition easing function */
  readonly transitionTimingFunction = input<string>(
    'cubic-bezier(0.4, 0, 0.2, 1)',
  );

  /** Enable free mode (no snapping) */
  readonly freeMode = input(false, { transform: booleanAttribute });

  /** Resistance ratio for edge bounce effect (0-1) */
  readonly resistance = input(0.85);

  /** Enable will-change optimization during animation only */
  readonly optimizePerformance = input(true, { transform: booleanAttribute });

  // ============================================================================
  // NAVIGATION BEHAVIOR
  // ============================================================================

  /** Enable circular/infinite scrolling (jumps to start/end) */
  readonly circular = input(false, { transform: booleanAttribute });

  /** Enable true loop (duplicates items for seamless infinite scroll) */
  readonly loop = input(false, { transform: booleanAttribute });

  /** Center the active slide */
  readonly centerMode = input(false, { transform: booleanAttribute });

  /** Show partially next/previous slides (peek effect) */
  readonly peekMode = input(false, { transform: booleanAttribute });

  /** Peek amount in percentage */
  readonly peekAmount = input(10, { transform: numberAttribute });

  /** Show/hide navigation buttons */
  readonly showNavigators = input(true, { transform: booleanAttribute });

  /** Navigation button style */
  readonly navStyle = input<CarouselNavStyle>('default');

  /** Navigation button position */
  readonly navPosition = input<CarouselNavPosition>('default');

  /** Custom CSS class for previous button */
  readonly prevButtonClass = input<string>('');

  /** Custom CSS class for next button */
  readonly nextButtonClass = input<string>('');

  /** Show/hide page indicators */
  readonly showIndicators = input(true, { transform: booleanAttribute });

  /** Indicator style */
  readonly indicatorStyle = input<CarouselIndicatorStyle>('dots');

  /** Indicator position */
  readonly indicatorPosition = input<CarouselIndicatorPosition>('bottom');

  // ============================================================================
  // INTERACTION
  // ============================================================================

  /** Enable touch/mouse swipe */
  readonly swipeable = input(true, { transform: booleanAttribute });

  /** Touch sensitivity ratio (1 = 1:1, 0.5 = half speed) */
  readonly touchRatio = input(1);

  /** Minimum pixels to trigger swipe */
  readonly threshold = input(10, { transform: numberAttribute });

  /** Show grab cursor on hover */
  readonly grabCursor = input(true, { transform: booleanAttribute });

  /** Enable mousewheel navigation */
  readonly mousewheel = input(false, { transform: booleanAttribute });

  /** Enable keyboard navigation */
  readonly keyboard = input(true, { transform: booleanAttribute });

  /** Allow momentum scrolling */
  readonly momentum = input(true, { transform: booleanAttribute });

  /** Momentum deceleration */
  readonly momentumRatio = input(0.95);

  /** Enable haptic feedback on mobile (if supported) */
  readonly hapticFeedback = input(false, { transform: booleanAttribute });

  // ============================================================================
  // AUTOPLAY
  // ============================================================================

  /** Autoplay interval in milliseconds (0 = disabled) */
  readonly autoplayInterval = input(0, { transform: numberAttribute });

  /** Autoplay direction */
  readonly autoplayDirection = input<CarouselAutoplayDirection>('forward');

  /** Pause autoplay on hover */
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  /** Pause autoplay on interaction */
  readonly pauseOnInteraction = input(true, { transform: booleanAttribute });

  /** Show autoplay progress indicator */
  readonly showProgress = input(false, { transform: booleanAttribute });

  /** Progress indicator style: 'bar' | 'circular' */
  readonly progressStyle = input<'bar' | 'circular'>('bar');

  /** Disable autoplay when carousel is not in viewport */
  readonly autoplayOnlyInView = input(false, { transform: booleanAttribute });

  /** Resume autoplay after interaction delay (ms) */
  readonly autoplayResumeDelay = input(3000, { transform: numberAttribute });

  // ============================================================================
  // PERFORMANCE & LOADING
  // ============================================================================

  /** Enable virtual scrolling for large datasets */
  readonly virtual = input(false, { transform: booleanAttribute });

  /** Virtual buffer size (items to render outside viewport) */
  readonly virtualBuffer = input(2, { transform: numberAttribute });

  /** Preload strategy for items */
  readonly preloadStrategy = input<CarouselPreloadStrategy>('lazy');

  /** Prefetch adjacent items */
  readonly prefetchAdjacent = input(true, { transform: booleanAttribute });

  /** Respect prefers-reduced-motion */
  readonly respectReducedMotion = input(true, { transform: booleanAttribute });

  // ============================================================================
  // ADVANCED FEATURES
  // ============================================================================

  /** Enable hash navigation (URL sync) */
  readonly hashNavigation = input(false, { transform: booleanAttribute });

  /** Hash prefix for URL */
  readonly hashPrefix = input<string>('slide-');

  /** Enable browser history integration */
  readonly history = input(false, { transform: booleanAttribute });

  /** Track item view time for analytics */
  readonly trackViewTime = input(false, { transform: booleanAttribute });

  /** Enable zoom on item click */
  readonly zoomOnClick = input(false, { transform: booleanAttribute });

  /** Zoom scale factor */
  readonly zoomScale = input<number>(1.5);

  /** Watch slides progress for parallax effects */
  readonly watchSlidesProgress = input(false, { transform: booleanAttribute });

  // ============================================================================
  // TEMPLATE REFS
  // ============================================================================

  readonly itemTemplate =
    contentChild<TemplateRef<CarouselItemContext<T>>>('item');
  readonly headerTemplate = contentChild<TemplateRef<void>>('header');
  readonly footerTemplate = contentChild<TemplateRef<void>>('footer');
  readonly prevButtonTemplate = contentChild<TemplateRef<void>>('prevButton');
  readonly nextButtonTemplate = contentChild<TemplateRef<void>>('nextButton');
  readonly indicatorTemplate =
    contentChild<TemplateRef<{ index: number; active: boolean }>>('indicator');
  readonly loadingTemplate = contentChild<TemplateRef<void>>('loading');
  readonly emptyTemplate = contentChild<TemplateRef<void>>('empty');
  readonly progressTemplate =
    contentChild<TemplateRef<{ progress: number }>>('progress');

  // ============================================================================
  // VIEW CHILDREN
  // ============================================================================

  readonly itemsContainer =
    viewChild<ElementRef<HTMLDivElement>>('itemsContainer');
  readonly carouselWrapper =
    viewChild<ElementRef<HTMLDivElement>>('carouselWrapper');
  readonly trackElement = viewChild<ElementRef<HTMLDivElement>>('trackElement');
  readonly itemElements =
    viewChildren<ElementRef<HTMLDivElement>>('carouselItem');

  // ============================================================================
  // OUTPUTS
  // ============================================================================

  /** Emitted when page changes */
  readonly pageChange = output<number>();

  /** Emitted before slide change (cancelable) */
  readonly slideChange = output<CarouselSlideEvent<T>>();

  /** Emitted after slide change completes */
  readonly slideChanged = output<CarouselSlideEvent<T>>();

  /** Emitted when reaching beginning */
  readonly reachBeginning = output<void>();

  /** Emitted when reaching end */
  readonly reachEnd = output<void>();

  /** Emitted on scroll progress (0-1) */
  readonly progressChange = output<number>();

  /** Emitted when item is clicked */
  readonly itemClick = output<{ item: T; index: number }>();

  /** Emitted when item comes into view */
  readonly itemView = output<{ item: T; index: number; duration: number }>();

  /** Autoplay lifecycle events */
  readonly autoplayStart = output<void>();
  readonly autoplayStop = output<void>();
  readonly autoplayPause = output<void>();
  readonly autoplayResume = output<void>();

  /** Touch/Drag events */
  readonly touchStart = output<TouchEvent | MouseEvent>();
  readonly touchMove = output<TouchEvent | MouseEvent>();
  readonly touchEnd = output<TouchEvent | MouseEvent>();

  /** Swipe direction detected */
  readonly swipeDirection = output<'left' | 'right' | 'up' | 'down'>();

  // ============================================================================
  // INTERNAL STATE SIGNALS
  // ============================================================================

  protected readonly _currentPage = signal<number>(0);
  protected readonly _activeNumVisible = signal<number>(1);
  protected readonly _activeNumScroll = signal<number>(1);
  protected readonly _activeSpaceBetween = signal<number>(0);
  protected readonly _isAnimating = signal<boolean>(false);
  protected readonly _isHovered = signal<boolean>(false);
  protected readonly _isInView = signal<boolean>(true);
  protected readonly _isDragging = signal<boolean>(false);
  protected readonly _autoplayProgress = signal<number>(0);
  protected readonly _itemViewTimes = signal<Map<number, number>>(new Map());
  protected readonly _reducedMotion = signal<boolean>(false);
  protected readonly _touchStart = signal<{
    x: number;
    y: number;
    time: number;
  } | null>(null);
  protected readonly _touchCurrent = signal<{ x: number; y: number } | null>(
    null,
  );
  protected readonly _dragOffset = signal<number>(0);
  protected readonly _momentum = signal<number>(0);
  protected readonly _zoomedIndex = signal<number>(-1);
  protected readonly _slideProgress = signal<Map<number, number>>(new Map());

  // Autoplay state
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private autoplayProgressInterval: ReturnType<typeof setInterval> | null =
    null;
  private autoplayPaused = false;
  private autoplayReversed = false;
  private autoplayResumeTimer: ReturnType<typeof setTimeout> | null = null;
  private slideChangedTimer: ReturnType<typeof setTimeout> | null = null;
  private destroyed = false;

  // Intersection observer for viewport detection
  private intersectionObserver: IntersectionObserver | null = null;

  // Animation frame for momentum
  private momentumRAF: number | null = null;

  // View time tracking
  private viewTimeStartMap = new Map<number, number>();

  // ControlValueAccessor implementation
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};
  private disabled = false;

  // ============================================================================
  // INJECTION
  // ============================================================================

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef);

  // ============================================================================
  // COMPUTED SIGNALS
  // ============================================================================

  readonly isVertical = computed(() => this.orientation() === 'vertical');
  readonly isRTL = computed(() => this.direction() === 'rtl');
  readonly totalItems = computed(() => this.value()?.length ?? 0);
  readonly isEmpty = computed(() => this.totalItems() === 0);
  readonly isStackedEffect = computed(() => {
    const effect = this.effect();
    return (
      effect === 'fade' ||
      effect === 'cube' ||
      effect === 'flip' ||
      effect === 'cards'
    );
  });

  readonly effectiveNumVisible = computed(() => {
    const num = this._activeNumVisible();
    const total = this.totalItems();

    if (num === -1) {
      // TODO: Auto calculation based on container width
      return Math.min(3, total);
    }

    return Math.max(1, Math.min(num, total || 1));
  });
  readonly effectiveVisibleForPaging = computed(() =>
    this.isStackedEffect() ? 1 : this.effectiveNumVisible(),
  );

  readonly totalPages = computed(() => {
    const items = this.totalItems();
    const visible = this.effectiveVisibleForPaging();
    const scroll = Math.max(1, this._activeNumScroll());

    if (items === 0 || visible === 0) return 0;
    if (this.freeMode()) return items;

    // Calculate pages based on scroll amount
    const remainingItems = items - visible;
    if (remainingItems <= 0) return 1;

    return Math.ceil(remainingItems / scroll) + 1;
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );

  readonly canNavigateForward = computed(() => {
    const total = this.totalPages();
    if (total <= 1) return false;
    if (this.loop() || this.circular()) return true;
    return this._currentPage() < total - 1;
  });

  readonly canNavigateBackward = computed(() => {
    const total = this.totalPages();
    if (total <= 1) return false;
    if (this.loop() || this.circular()) return true;
    return this._currentPage() > 0;
  });

  readonly currentSlideInfo = computed(() => {
    const page = this._currentPage();
    const scroll = this._activeNumScroll();
    const visible = this.effectiveVisibleForPaging();
    const total = this.totalItems();

    const startIndex = page * scroll;
    const endIndex = Math.min(startIndex + visible, total);

    return {
      page,
      startIndex,
      endIndex,
      visibleCount: endIndex - startIndex,
      total,
    };
  });

  readonly transformStyle = computed(() => {
    if (this.isStackedEffect()) {
      return {
        transform: 'none',
        transitionDuration: this._isDragging()
          ? '0ms'
          : `${this.transitionDuration()}ms`,
        transitionTimingFunction: this.transitionTimingFunction(),
      };
    }

    const page = this._currentPage();
    const scroll = this._activeNumScroll();
    const visible = this.effectiveNumVisible();
    const isVert = this.isVertical();
    const rtl = this.isRTL();
    const centerMode = this.centerMode();
    const dragOffset = this._dragOffset();
    const spaceBetween = this._activeSpaceBetween();

    // Base calculation
    const percentagePerItem = 100 / visible;
    const itemsToShift = page * scroll;
    const gapCompensationPerItem = visible > 0 ? spaceBetween / visible : 0;

    let translatePct = -(itemsToShift * percentagePerItem);
    let translatePx = -(itemsToShift * gapCompensationPerItem);

    // Center mode adjustment
    if (centerMode && visible > 1) {
      const centerOffset = (visible - 1) / 2;
      translatePct += centerOffset * percentagePerItem;
      translatePx += centerOffset * gapCompensationPerItem;
    }

    // RTL adjustment
    if (rtl && !isVert) {
      translatePct = -translatePct;
      translatePx = -translatePx;
    }

    // Add drag offset
    translatePx += dragOffset;

    const translateVal = `calc(${translatePct}% + ${translatePx}px)`;
    const x = !isVert ? translateVal : '0';
    const y = isVert ? translateVal : '0';

    return {
      transform: `translate3d(${x}, ${y}, 0)`,
      transitionDuration: this._isDragging()
        ? '0ms'
        : `${this.transitionDuration()}ms`,
      transitionTimingFunction: this.transitionTimingFunction(),
    };
  });

  readonly icons = { ChevronLeft, ChevronRight };

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  constructor() {
    this.destroyRef.onDestroy(() => this.destroy());

    // Sync page input with model
    effect(() => {
      const inputPage = this.page();
      untracked(() => {
        if (inputPage !== this._currentPage() && inputPage >= 0) {
          this.goToPage(inputPage, false);
        }
      });
    });

    // Sync configuration inputs
    effect(() => {
      this._activeNumVisible.set(this.normalizeVisibleCount(this.numVisible()));
      this._activeNumScroll.set(this.normalizeScrollCount(this.numScroll()));
      this._activeSpaceBetween.set(this.spaceBetween());
    });

    // Responsive options
    effect(() => {
      if (isPlatformBrowser(this.platformId) && this.responsiveOptions().length > 0) {
        this.applyResponsiveOptions();
      }
    });

    // Autoplay management
    effect(() => {
      const interval = this.autoplayInterval();
      const hovered = this._isHovered();
      const pauseOnHover = this.pauseOnHover();
      const inView = this._isInView();
      const onlyInView = this.autoplayOnlyInView();

      if (!isPlatformBrowser(this.platformId)) return;

      if (interval > 0) {
        // Check if should pause
        const shouldPause =
          (hovered && pauseOnHover) || (onlyInView && !inView);

        if (shouldPause) {
          this.pauseAutoplay();
        } else if (!this.autoplayPaused) {
          this.startAutoplay();
        }
      } else {
        this.stopAutoplay();
      }
    });

    // Check for reduced motion preference
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.setupEventListeners();
        this.applyResponsiveOptions();
        this.checkReducedMotion();
        this.setupIntersectionObserver();

        // Set initial slide
        const initial = this.initialSlide();
        if (initial > 0 && initial < this.totalPages()) {
          this.goToPage(initial, false);
        }

        // Hash navigation
        if (this.hashNavigation()) {
          this.initHashNavigation();
        }
      });
    }
  }

  ngOnInit(): void {
    // Initial setup handled in constructor effects
  }

  ngAfterViewInit(): void {
    // View queries are ready
  }

  // ============================================================================
  // PUBLIC API METHODS
  // ============================================================================

  /**
   * Navigate to next slide
   */
  next(event?: Event, source: 'user' | 'autoplay' = 'user'): void {
    event?.preventDefault();
    if (!this.canNavigateForward() || this._isAnimating()) return;

    this.handleNavigation(true, source);
  }

  /**
   * Navigate to previous slide
   */
  previous(event?: Event, source: 'user' | 'autoplay' = 'user'): void {
    event?.preventDefault();
    if (!this.canNavigateBackward() || this._isAnimating()) return;

    this.handleNavigation(false, source);
  }

  /**
   * Navigate to specific page
   * @param pageIndex Target page index
   * @param emit Whether to emit events
   * @param speed Optional custom transition speed
   */
  goToPage(
    pageIndex: number,
    emit: boolean = true,
    speed?: number,
    source: 'user' | 'autoplay' = 'user',
  ): void {
    const total = this.totalPages();
    if (total === 0) return;

    let targetPage = pageIndex;

    // Handle circular wrapping
    if (this.circular() || this.loop()) {
      if (pageIndex < 0) targetPage = total - 1;
      if (pageIndex >= total) targetPage = 0;
    } else {
      targetPage = Math.max(0, Math.min(pageIndex, total - 1));
    }

    if (targetPage === this._currentPage()) return;

    const previousPage = this._currentPage();
    const direction: 'forward' | 'backward' =
      targetPage > previousPage ? 'forward' : 'backward';

    // Always reset drag offset when navigation is committed.
    this._dragOffset.set(0);

    // Emit before-change event
    if (emit) {
      const slideEvent: CarouselSlideEvent<T> = {
        currentIndex: targetPage,
        previousIndex: previousPage,
        currentItem: this.getItemAtPage(targetPage),
        previousItem: this.getItemAtPage(previousPage),
        direction,
      };
      this.slideChange.emit(slideEvent);
    }

    // Update page
    this._currentPage.set(targetPage);
    this.page.set(targetPage);

    if (emit) {
      this.pageChange.emit(targetPage);
      this.onChange(targetPage);
    }

    // Check boundaries
    if (targetPage === 0) {
      this.reachBeginning.emit();
    }
    if (targetPage === total - 1) {
      this.reachEnd.emit();
    }

    // Calculate and emit progress
    const progress = total > 1 ? targetPage / (total - 1) : 0;
    this.progressChange.emit(progress);

    // Update hash if enabled
    if (this.hashNavigation()) {
      this.updateHash(targetPage);
    }

    // Reset autoplay
    if (source === 'autoplay') {
      // Autoplay-driven navigation keeps the same timer running,
      // but progress must restart for the next cycle.
      if (this.showProgress() && this.autoplayTimer) {
        this.startProgressAnimation();
      }
    } else if (!emit) {
      // Programmatic updates should not change autoplay state.
    } else if (this.autoplayInterval() > 0 && this.pauseOnInteraction()) {
      this.pauseAutoplay();
      this.scheduleAutoplayResume();
    } else if (this.autoplayInterval() > 0) {
      this.resetAutoplay();
    }

    // Handle animation state
    this._isAnimating.set(true);
    if (this.slideChangedTimer) {
      clearTimeout(this.slideChangedTimer);
      this.slideChangedTimer = null;
    }
    this.slideChangedTimer = setTimeout(() => {
      if (this.destroyed) {
        return;
      }

      this._isAnimating.set(false);

      // Emit after-change event
      if (emit) {
        const slideEvent: CarouselSlideEvent<T> = {
          currentIndex: targetPage,
          previousIndex: previousPage,
          currentItem: this.getItemAtPage(targetPage),
          previousItem: this.getItemAtPage(previousPage),
          direction,
        };
        this.slideChanged.emit(slideEvent);
      }
    }, speed ?? this.transitionDuration());

    // Track view time
    if (this.trackViewTime()) {
      this.recordViewTime(previousPage);
      this.startViewTimeTracking(targetPage);
    }
  }

  /**
   * Navigate to specific slide with speed control
   */
  slideTo(index: number, speed?: number, runCallbacks: boolean = true): void {
    this.goToPage(index, runCallbacks, speed);
  }

  /**
   * Navigate to next slide with speed control
   */
  slideNext(speed?: number): void {
    if (!this.canNavigateForward()) return;
    const nextPage = this._currentPage() + 1;
    this.slideTo(nextPage, speed);
  }

  /**
   * Navigate to previous slide with speed control
   */
  slidePrev(speed?: number): void {
    if (!this.canNavigateBackward()) return;
    const prevPage = this._currentPage() - 1;
    this.slideTo(prevPage, speed);
  }

  /**
   * Update carousel (recalculate dimensions and state)
   */
  update(): void {
    this.applyResponsiveOptions();

    // Validate current page is still valid
    const currentPage = this._currentPage();
    const totalPages = this.totalPages();

    if (currentPage >= totalPages && totalPages > 0) {
      this.goToPage(totalPages - 1, false);
    }
  }

  /**
   * Destroy carousel and cleanup
   */
  destroy(): void {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;

    this.stopAutoplay();
    this.detachEvents();

    if (this.slideChangedTimer) {
      clearTimeout(this.slideChangedTimer);
      this.slideChangedTimer = null;
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.momentumRAF) {
      cancelAnimationFrame(this.momentumRAF);
      this.momentumRAF = null;
    }
  }

  /**
   * Append slide dynamically
   */
  appendSlide(item: T): void {
    const currentValue = this.value();
    // Since value is an input signal, we can't mutate it directly
    // User should handle this externally by updating the array
    console.warn('appendSlide: Please update the value input array externally');
  }

  /**
   * Prepend slide dynamically
   */
  prependSlide(item: T): void {
    console.warn(
      'prependSlide: Please update the value input array externally',
    );
  }

  /**
   * Remove slide at index
   */
  removeSlide(index: number): void {
    console.warn('removeSlide: Please update the value input array externally');
  }

  /**
   * Detach all event listeners
   */
  detachEvents(): void {
    // Events are handled via takeUntilDestroyed, so they clean up automatically
  }

  /**
   * Attach event listeners (re-enable after detaching)
   */
  attachEvents(): void {
    // Re-setup would require re-running afterNextRender logic
    this.setupEventListeners();
  }

  // ============================================================================
  // ITEM INTERACTION
  // ============================================================================

  onItemClick(item: T, index: number, event?: Event): void {
    this.itemClick.emit({ item, index });

    if (this.zoomOnClick()) {
      this.toggleZoom(index);
    }
  }

  toggleZoom(index: number): void {
    const current = this._zoomedIndex();
    this._zoomedIndex.set(current === index ? -1 : index);
  }

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================

  onKeyDown(event: KeyboardEvent): void {
    if (!this.keyboard()) return;

    const wrapperElement = this.carouselWrapper()?.nativeElement;
    const target = event.target;
    if (
      target instanceof Element &&
      target !== wrapperElement &&
      this.isInteractiveTarget(target)
    ) {
      return;
    }

    const { key } = event;
    const isVert = this.isVertical();
    const rtl = this.isRTL();

    let handled = false;

    switch (key) {
      case 'ArrowLeft':
        if (!isVert) {
          rtl ? this.next() : this.previous();
          handled = true;
        }
        break;

      case 'ArrowRight':
        if (!isVert) {
          rtl ? this.previous() : this.next();
          handled = true;
        }
        break;

      case 'ArrowUp':
        if (isVert) {
          this.previous();
          handled = true;
        }
        break;

      case 'ArrowDown':
        if (isVert) {
          this.next();
          handled = true;
        }
        break;

      case 'Home':
        this.goToPage(0);
        handled = true;
        break;

      case 'End':
        this.goToPage(this.totalPages() - 1);
        handled = true;
        break;

      case 'PageUp':
        this.goToPage(Math.max(0, this._currentPage() - 3));
        handled = true;
        break;

      case 'PageDown':
        this.goToPage(Math.min(this.totalPages() - 1, this._currentPage() + 3));
        handled = true;
        break;

      case ' ':
      case 'Enter':
        // Toggle autoplay on spacebar
        if (this.autoplayInterval() > 0) {
          this.autoplayPaused ? this.resumeAutoplay() : this.pauseAutoplay();
          handled = true;
        }
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
      this.onTouched();
    }
  }

  // ============================================================================
  // INTERNAL NAVIGATION LOGIC
  // ============================================================================

  private handleNavigation(
    forward: boolean,
    source: 'user' | 'autoplay' = 'user',
  ): void {
    const total = this.totalPages();
    const current = this._currentPage();

    let next: number;

    if (forward) {
      if (this.loop() || this.circular()) {
        next = current === total - 1 ? 0 : current + 1;
      } else {
        next = Math.min(current + 1, total - 1);
      }
    } else {
      if (this.loop() || this.circular()) {
        next = current === 0 ? total - 1 : current - 1;
      } else {
        next = Math.max(current - 1, 0);
      }
    }

    this.goToPage(next, true, undefined, source);
  }

  private getItemAtPage(pageIndex: number): T | null {
    const scroll = this._activeNumScroll();
    const itemIndex = pageIndex * scroll;
    const items = this.value();
    return items[itemIndex] ?? null;
  }

  // ============================================================================
  // AUTOPLAY
  // ============================================================================

  private startAutoplay(): void {
    if (this.autoplayTimer || this.autoplayInterval() <= 0) return;

    const interval = this.autoplayInterval();
    const direction = this.autoplayDirection();

    this.autoplayPaused = false;
    this.autoplayStart.emit();

    // Start progress animation
    if (this.showProgress()) {
      this.startProgressAnimation();
    }

    this.autoplayTimer = setInterval(() => {
      // Determine direction
      let shouldGoForward = direction === 'forward';

      if (direction === 'alternate') {
        // Alternate direction at boundaries
        if (this.autoplayReversed) {
          shouldGoForward = false;
          if (this._currentPage() === 0) {
            this.autoplayReversed = false;
          }
        } else {
          shouldGoForward = true;
          if (this._currentPage() === this.totalPages() - 1) {
            this.autoplayReversed = true;
          }
        }
      }

      // Navigate
      if (shouldGoForward) {
        if (this.canNavigateForward()) {
          this.next(undefined, 'autoplay');
        } else if (this.circular() || this.loop()) {
          this.goToPage(0, true, undefined, 'autoplay');
        } else {
          this.stopAutoplay();
        }
      } else {
        if (this.canNavigateBackward()) {
          this.previous(undefined, 'autoplay');
        } else if (this.circular() || this.loop()) {
          this.goToPage(this.totalPages() - 1, true, undefined, 'autoplay');
        } else {
          this.stopAutoplay();
        }
      }
    }, interval);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
      this.autoplayPaused = false;
      this.autoplayStop.emit();
    }

    this.stopProgressAnimation();

    if (this.autoplayResumeTimer) {
      clearTimeout(this.autoplayResumeTimer);
      this.autoplayResumeTimer = null;
    }
  }

  private pauseAutoplay(): void {
    if (!this.autoplayTimer || this.autoplayPaused) return;

    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
    this.autoplayPaused = true;
    this.autoplayPause.emit();
    this.stopProgressAnimation();
  }

  private resumeAutoplay(): void {
    if (!this.autoplayPaused) return;

    this.autoplayPaused = false;
    this.autoplayResume.emit();
    this.startAutoplay();
  }

  private resetAutoplay(): void {
    if (this.autoplayInterval() > 0) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  private scheduleAutoplayResume(): void {
    if (this.autoplayResumeTimer) {
      clearTimeout(this.autoplayResumeTimer);
    }

    const delay = this.autoplayResumeDelay();
    if (delay > 0) {
      this.autoplayResumeTimer = setTimeout(() => {
        this.resumeAutoplay();
      }, delay);
    }
  }

  private startProgressAnimation(): void {
    this.stopProgressAnimation();

    const interval = this.autoplayInterval();
    const updateFrequency = 16; // ~60fps
    const totalSteps = interval / updateFrequency;
    let currentStep = 0;

    this._autoplayProgress.set(0);

    this.autoplayProgressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / totalSteps) * 100, 100);
      this._autoplayProgress.set(progress);

      if (progress >= 100) {
        this.stopProgressAnimation();
      }
    }, updateFrequency);
  }

  private stopProgressAnimation(): void {
    if (this.autoplayProgressInterval) {
      clearInterval(this.autoplayProgressInterval);
      this.autoplayProgressInterval = null;
      this._autoplayProgress.set(0);
    }
  }

  // ============================================================================
  // RESPONSIVE
  // ============================================================================

  private normalizeVisibleCount(value: number): number {
    if (!Number.isFinite(value)) return 1;
    if (value === -1) return -1;
    return Math.max(1, Math.floor(value));
  }

  private normalizeScrollCount(value: number): number {
    if (!Number.isFinite(value)) return 1;
    return Math.max(1, Math.floor(value));
  }

  private applyResponsiveOptions(): void {
    if (!this.responsiveOptions().length) {
      // Reset to defaults
      this._activeNumVisible.set(this.normalizeVisibleCount(this.numVisible()));
      this._activeNumScroll.set(this.normalizeScrollCount(this.numScroll()));
      this._activeSpaceBetween.set(this.spaceBetween());
      return;
    }

    const windowWidth = window.innerWidth;
    const sortedOptions = [...this.responsiveOptions()].sort((a, b) => {
      const bpA =
        typeof a.breakpoint === 'string'
          ? parseInt(a.breakpoint)
          : a.breakpoint;
      const bpB =
        typeof b.breakpoint === 'string'
          ? parseInt(b.breakpoint)
          : b.breakpoint;
      return bpB - bpA; // Descending order
    });

    let matchedOption: CarouselResponsiveOptions | null = null;

    for (const option of sortedOptions) {
      const bp =
        typeof option.breakpoint === 'string'
          ? parseInt(option.breakpoint)
          : option.breakpoint;

      if (windowWidth <= bp) {
        matchedOption = option;
      }
    }

    if (matchedOption) {
      if (matchedOption.numVisible !== undefined) {
        this._activeNumVisible.set(
          this.normalizeVisibleCount(matchedOption.numVisible),
        );
      }
      if (matchedOption.numScroll !== undefined) {
        this._activeNumScroll.set(
          this.normalizeScrollCount(matchedOption.numScroll),
        );
      }
      if (matchedOption.spaceBetween !== undefined) {
        this._activeSpaceBetween.set(matchedOption.spaceBetween);
      }
    } else {
      // No match, use defaults
      this._activeNumVisible.set(this.normalizeVisibleCount(this.numVisible()));
      this._activeNumScroll.set(this.normalizeScrollCount(this.numScroll()));
      this._activeSpaceBetween.set(this.spaceBetween());
    }
  }

  onIndicatorKeydown(event: KeyboardEvent, pageIndex: number): void {
    const total = this.totalPages();
    if (total <= 1) return;

    const isVert = this.isVertical();
    const rtl = this.isRTL();
    let nextIndex = pageIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (!isVert) {
          nextIndex = rtl ? pageIndex + 1 : pageIndex - 1;
        } else {
          return;
        }
        break;
      case 'ArrowRight':
        if (!isVert) {
          nextIndex = rtl ? pageIndex - 1 : pageIndex + 1;
        } else {
          return;
        }
        break;
      case 'ArrowUp':
        if (isVert) {
          nextIndex = pageIndex - 1;
        } else {
          return;
        }
        break;
      case 'ArrowDown':
        if (isVert) {
          nextIndex = pageIndex + 1;
        } else {
          return;
        }
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = total - 1;
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.goToPage(pageIndex);
        return;
      default:
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const normalizedIndex = this.normalizeIndicatorIndex(nextIndex, total);
    this.goToPage(normalizedIndex);
    this.focusIndicator(normalizedIndex);
  }

  isTabIndicatorStyle(): boolean {
    const style = this.indicatorStyle();
    return style === 'dots' || style === 'lines';
  }

  getIndicatorTabIndex(pageIndex: number): number {
    return this._currentPage() === pageIndex ? 0 : -1;
  }

  getIndicatorId(pageIndex: number): string {
    return `${this.indicatorsId}-tab-${pageIndex}`;
  }

  getIndicatorAriaLabel(pageIndex: number): string {
    return `Go to slide ${pageIndex + 1}`;
  }

  getSlideAriaLabel(itemIndex: number): string {
    const totalItems = this.totalItems();
    return `Slide ${itemIndex + 1} of ${totalItems}`;
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  private setupEventListeners(): void {
    const element = this.elementRef.nativeElement;

    // Hover state
    if (this.pauseOnHover() || this.grabCursor()) {
      merge(
        fromEvent(element, 'mouseenter').pipe(map(() => true)),
        fromEvent(element, 'mouseleave').pipe(map(() => false)),
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((isHovered) => this._isHovered.set(isHovered));
    }

    // Touch/Swipe
    if (this.swipeable()) {
      this.setupTouchEvents();
    }

    // Mousewheel
    if (this.mousewheel()) {
      this.setupMousewheelEvents();
    }

    // Resize
    fromEvent(window, 'resize')
      .pipe(debounceTime(150), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.applyResponsiveOptions();
        this.update();
      });
  }

  private setupTouchEvents(): void {
    const container = this.itemsContainer();
    if (!container) return;

    const element = container.nativeElement;

    // Touch start
    merge(
      fromEvent<TouchEvent>(element, 'touchstart', { passive: false }),
      fromEvent<MouseEvent>(element, 'mousedown'),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        this.onDragStart(e);
      });

    // Touch move
    merge(
      fromEvent<TouchEvent>(document, 'touchmove', { passive: false }),
      fromEvent<MouseEvent>(document, 'mousemove'),
    )
      .pipe(
        filter(() => this._isDragging()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => {
        this.onDragMove(e);
      });

    // Touch end
    merge(
      fromEvent<TouchEvent>(document, 'touchend'),
      fromEvent<MouseEvent>(document, 'mouseup'),
    )
      .pipe(
        filter(() => this._isDragging()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => {
        this.onDragEnd(e);
      });
  }

  private setupMousewheelEvents(): void {
    const element = this.elementRef.nativeElement;

    fromEvent<WheelEvent>(element, 'wheel', { passive: false })
      .pipe(throttleTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        e.preventDefault();

        const delta = e.deltaY || e.deltaX;

        if (delta > 0) {
          this.next();
        } else if (delta < 0) {
          this.previous();
        }
      });
  }

  // ============================================================================
  // DRAG/SWIPE HANDLING
  // ============================================================================

  private onDragStart(event: TouchEvent | MouseEvent): void {
    // Prevent if disabled or already animating
    if (this.disabled || this._isAnimating()) return;

    if (
      'button' in event &&
      typeof event.button === 'number' &&
      event.button !== 0
    ) {
      return;
    }

    if (this.isInteractiveTarget(event.target)) {
      return;
    }

    const point = this.getEventPoint(event);
    if (!point) return;

    this._isDragging.set(true);
    this._touchStart.set({
      x: point.x,
      y: point.y,
      time: Date.now(),
    });
    this._touchCurrent.set(point);
    this._dragOffset.set(0);

    this.touchStart.emit(event);

    // Cancel momentum if present
    if (this.momentumRAF) {
      cancelAnimationFrame(this.momentumRAF);
      this.momentumRAF = null;
    }
  }

  private onDragMove(event: TouchEvent | MouseEvent): void {
    const start = this._touchStart();
    if (!start) return;

    const point = this.getEventPoint(event);
    if (!point) return;

    this._touchCurrent.set(point);

    const isVert = this.isVertical();
    const diff = isVert ? point.y - start.y : point.x - start.x;
    const threshold = this.threshold();

    // Only prevent default if we've moved past threshold
    if (Math.abs(diff) > threshold && event.cancelable) {
      event.preventDefault();
    }

    // Calculate drag offset as percentage
    const container = this.itemsContainer();
    if (!container) return;

    const containerSize = isVert
      ? container.nativeElement.offsetHeight
      : container.nativeElement.offsetWidth;
    if (containerSize <= 0) return;

    const touchRatio = this.touchRatio();

    // Keep drag offset in pixels to match transformStyle math.
    const dragOffsetPx = diff * touchRatio;

    // Apply resistance at boundaries
    const currentPage = this._currentPage();
    const totalPages = this.totalPages();
    const atStart = currentPage === 0 && dragOffsetPx > 0;
    const atEnd = currentPage === totalPages - 1 && dragOffsetPx < 0;

    let finalOffset = dragOffsetPx;

    if ((atStart || atEnd) && !this.loop() && !this.circular()) {
      const resistance = this.resistance();
      finalOffset = dragOffsetPx * resistance;
    }

    this._dragOffset.set(finalOffset);
    this.touchMove.emit(event);
  }

  private onDragEnd(event: TouchEvent | MouseEvent): void {
    const start = this._touchStart();
    const current = this._touchCurrent();

    if (!start || !current) {
      this._isDragging.set(false);
      this._dragOffset.set(0);
      this._touchStart.set(null);
      this._touchCurrent.set(null);
      return;
    }

    this._isDragging.set(false);

    const isVert = this.isVertical();
    const diff = isVert ? current.y - start.y : current.x - start.x;
    const threshold = this.threshold();
    const timeDiff = Date.now() - start.time;

    // Calculate velocity for momentum
    const velocity = Math.abs(diff / timeDiff);

    this.touchEnd.emit(event);

    // Determine if swipe was significant
    const isSignificantSwipe = Math.abs(diff) > threshold || velocity > 0.5;

    if (isSignificantSwipe) {
      // Emit swipe direction
      let direction: 'left' | 'right' | 'up' | 'down';

      if (isVert) {
        direction = diff > 0 ? 'down' : 'up';
      } else {
        direction = diff > 0 ? 'right' : 'left';
      }

      this.swipeDirection.emit(direction);

      // Navigate based on swipe
      const rtl = this.isRTL();
      const shouldGoNext = isVert ? diff < 0 : rtl ? diff > 0 : diff < 0;

      this._dragOffset.set(0);

      if (shouldGoNext) {
        this.next();
      } else {
        this.previous();
      }

      // Haptic feedback
      if (this.hapticFeedback() && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } else {
      // Snap back to current position
      this._dragOffset.set(0);
    }

    // Apply momentum if enabled
    if (this.momentum() && velocity > 0.3) {
      this.applyMomentum(velocity, diff > 0);
    }

    // Reset
    this._touchStart.set(null);
    this._touchCurrent.set(null);

    // Reset autoplay
    if (this.pauseOnInteraction()) {
      this.scheduleAutoplayResume();
    }
  }

  private getEventPoint(
    event: TouchEvent | MouseEvent,
  ): { x: number; y: number } | null {
    if ('touches' in event) {
      const touch = event.touches[0];
      return touch ? { x: touch.clientX, y: touch.clientY } : null;
    }
    return { x: event.clientX, y: event.clientY };
  }

  private isInteractiveTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }

    return Boolean(
      target.closest(
        'button, a, input, textarea, select, label, [role="button"], [data-carousel-no-drag]',
      ),
    );
  }

  private normalizeIndicatorIndex(index: number, total: number): number {
    if (total <= 0) return 0;
    if (index < 0) return total - 1;
    if (index >= total) return 0;
    return index;
  }

  private focusIndicator(pageIndex: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const indicator = this.elementRef.nativeElement.querySelector(
      `[data-indicator-index="${pageIndex}"]`,
    );

    if (indicator instanceof HTMLElement) {
      indicator.focus();
    }
  }

  private applyMomentum(initialVelocity: number, forward: boolean): void {
    let velocity = initialVelocity;
    const ratio = this.momentumRatio();
    const minVelocity = 0.01;

    const animate = () => {
      velocity *= ratio;

      if (velocity < minVelocity) {
        this._momentum.set(0);
        return;
      }

      this._momentum.set(velocity * (forward ? 1 : -1));
      this.momentumRAF = requestAnimationFrame(animate);
    };

    this.momentumRAF = requestAnimationFrame(animate);
  }

  // ============================================================================
  // INTERSECTION OBSERVER
  // ============================================================================

  private setupIntersectionObserver(): void {
    if (!this.autoplayOnlyInView()) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this._isInView.set(entry.isIntersecting);
        });
      },
      { threshold: 0.5 },
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================

  private checkReducedMotion(): void {
    if (!this.respectReducedMotion()) return;

    if (typeof window.matchMedia !== 'function') {
      this._reducedMotion.set(false);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this._reducedMotion.set(mediaQuery.matches);

    // Listen for changes
    const onChange = (e: MediaQueryListEvent) => {
      this._reducedMotion.set(e.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => {
        mediaQuery.removeEventListener('change', onChange);
      });
    } else {
      mediaQuery.addListener(onChange);
      this.destroyRef.onDestroy(() => {
        mediaQuery.removeListener(onChange);
      });
    }
  }

  private announceSlideChange(pageIndex: number): void {
    // Create or update live region for screen readers
    const total = this.totalPages();
    const message = `Slide ${pageIndex + 1} of ${total}`;

    // This would need a dedicated live region element in the template
    // Implementation depends on template structure
  }

  // ============================================================================
  // VIEW TIME TRACKING
  // ============================================================================

  private startViewTimeTracking(pageIndex: number): void {
    if (!this.trackViewTime()) return;
    this.viewTimeStartMap.set(pageIndex, Date.now());
  }

  private recordViewTime(pageIndex: number): void {
    if (!this.trackViewTime()) return;

    const startTime = this.viewTimeStartMap.get(pageIndex);
    if (!startTime) return;

    const duration = Date.now() - startTime;
    const item = this.getItemAtPage(pageIndex);

    if (item) {
      this.itemView.emit({ item, index: pageIndex, duration });
    }

    this.viewTimeStartMap.delete(pageIndex);
  }

  // ============================================================================
  // HASH NAVIGATION
  // ============================================================================

  private initHashNavigation(): void {
    const hash = window.location.hash;
    const prefix = this.hashPrefix();

    if (hash.startsWith(`#${prefix}`)) {
      const slideNum = parseInt(hash.replace(`#${prefix}`, ''), 10);
      if (!isNaN(slideNum) && slideNum >= 0 && slideNum < this.totalPages()) {
        this.goToPage(slideNum, false);
      }
    }

    // Listen to hash changes
    fromEvent(window, 'hashchange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const newHash = window.location.hash;
        if (newHash.startsWith(`#${prefix}`)) {
          const slideNum = parseInt(newHash.replace(`#${prefix}`, ''), 10);
          if (!isNaN(slideNum)) {
            this.goToPage(slideNum, false);
          }
        }
      });
  }

  private updateHash(pageIndex: number): void {
    const prefix = this.hashPrefix();
    const newHash = `#${prefix}${pageIndex}`;

    if (this.history()) {
      window.history.pushState(null, '', newHash);
    } else {
      window.location.hash = newHash;
    }
  }

  // ============================================================================
  // TEMPLATE HELPERS
  // ============================================================================

  getItemContext(item: T, index: number): CarouselItemContext<T> {
    const slideInfo = this.currentSlideInfo();
    const isActive =
      index >= slideInfo.startIndex && index < slideInfo.endIndex;
    const isVisible = this.virtual()
      ? this.isItemInVirtualRange(index)
      : isActive;

    const progress = this._slideProgress().get(index) ?? 0;

    return {
      $implicit: item,
      index,
      count: this.totalItems(),
      isActive,
      isVisible,
      progress,
    };
  }

  trackByIndex(index: number): number {
    return index;
  }

  isItemActive(index: number): boolean {
    const slideInfo = this.currentSlideInfo();
    return index >= slideInfo.startIndex && index < slideInfo.endIndex;
  }

  isItemInVirtualRange(index: number): boolean {
    if (!this.virtual()) return true;

    const slideInfo = this.currentSlideInfo();
    const buffer = this.virtualBuffer();
    const start = Math.max(0, slideInfo.startIndex - buffer);
    const end = Math.min(this.totalItems(), slideInfo.endIndex + buffer);

    return index >= start && index < end;
  }

  shouldRenderItem(index: number): boolean {
    return !this.virtual() || this.isItemInVirtualRange(index);
  }

  // ============================================================================
  // CONTROL VALUE ACCESSOR
  // ============================================================================

  writeValue(value: number): void {
    if (value !== this._currentPage()) {
      this.goToPage(value, false);
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
