import {
  Component,
  ElementRef,
  input,
  OnInit,
  OnDestroy,
  signal,
  contentChildren,
  viewChild,
  viewChildren,
  inject,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MagaryTab } from './tab/tab';
@Component({
  selector: 'magary-tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryTabs implements OnInit, OnDestroy {
  tabs = contentChildren(MagaryTab);
  headersRef = viewChild<ElementRef<HTMLElement>>('tabHeaders');
  buttonsRef = viewChildren<ElementRef<HTMLElement>>('tabButton');

  public activeIndex = signal(0);
  public backgroundLine = input<string>('#000');
  public positionContent = input<string>('center');
  public background = input<string>('var(--surface-0)');
  public padding = input<string>('0');
  public heightLine = input<string>('5px');
  public panelWidth = input<'auto' | 'full'>('full');
  private resizeObserver: ResizeObserver | null = null;
  private rafId: number | null = null;
  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      if (!tabs.length) {
        return;
      }

      const activeIndex = this.activeIndex();
      const clampedIndex = Math.min(Math.max(activeIndex, 0), tabs.length - 1);

      if (clampedIndex !== activeIndex) {
        this.activeIndex.set(clampedIndex);
        return;
      }

      tabs.forEach((tab, index) => {
        tab.active.set(index === clampedIndex);
      });
    });

    effect(() => {
      this.updateUnderlinePosition(this.activeIndex());
    });
  }

  ngOnInit(): void {
    // Initialize ResizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateUnderlinePosition(this.activeIndex());
      });
      this.resizeObserver.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public selectTab(index: number): void {
    const total = this.tabs().length;
    if (!total) return;

    const safeIndex = Math.min(Math.max(index, 0), total - 1);
    this.activeIndex.set(safeIndex);
    this.scrollTabIntoView(safeIndex);
  }

  onTabKeydown(event: KeyboardEvent, index: number): void {
    const total = this.tabs().length;
    if (!total) return;

    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = index + 1 > total - 1 ? 0 : index + 1;
        break;
      case 'ArrowLeft':
        nextIndex = index - 1 < 0 ? total - 1 : index - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectTab(nextIndex);
    this.focusTab(nextIndex);
  }

  private updateUnderlinePosition(index: number): void {
    const update = () => {
      const buttons = this.buttonsRef();
      const activeBtn = buttons[index]?.nativeElement;
      const headersEl = this.headersRef()?.nativeElement;

      if (activeBtn && headersEl) {
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        headersEl.style.setProperty('--underline-left', `${left}px`);
        headersEl.style.setProperty('--underline-width', `${width}px`);
      }
    };

    update();

    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }

    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      update();
    });
  }

  private scrollTabIntoView(index: number): void {
    const headersEl = this.headersRef()?.nativeElement;
    const button = this.buttonsRef()[index]?.nativeElement;

    if (!headersEl || !button) {
      return;
    }

    const hasHorizontalOverflow = headersEl.scrollWidth > headersEl.clientWidth + 1;
    if (!hasHorizontalOverflow) {
      return;
    }

    const buttonLeft = button.offsetLeft;
    const buttonRight = buttonLeft + button.offsetWidth;
    const visibleLeft = headersEl.scrollLeft;
    const visibleRight = visibleLeft + headersEl.clientWidth;

    let targetLeft = visibleLeft;

    if (buttonLeft < visibleLeft) {
      targetLeft = Math.max(0, buttonLeft - 12);
    } else if (buttonRight > visibleRight) {
      targetLeft = buttonRight - headersEl.clientWidth + 12;
    }

    headersEl.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
  }

  private focusTab(index: number): void {
    const button = this.buttonsRef()[index]?.nativeElement;
    button?.focus?.();
  }
}
