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
  private resizeObserver: ResizeObserver | null = null;
  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      // Auto-select first tab if activeIndex is 0 and tabs change
      const tabs = this.tabs();
      if (tabs.length > 0) {
        tabs.forEach((tab, index) => {
          tab.active.set(index === this.activeIndex());
        });
      }
    });

    // Effect to update underline
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

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  public selectTab(index: number) {
    this.activeIndex.set(index);
    // Effect will handle the rest (setting active tab and underline)
  }

  private updateUnderlinePosition(index: number) {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      const buttons = this.buttonsRef();
      const activeBtn = buttons[index]?.nativeElement;
      const headersEl = this.headersRef()?.nativeElement;

      if (activeBtn && headersEl) {
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        headersEl.style.setProperty('--underline-left', `${left}px`);
        headersEl.style.setProperty('--underline-width', `${width}px`);
      }
    });
  }
}
