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
    this.activeIndex.set(index);
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
}
