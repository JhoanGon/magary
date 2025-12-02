import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  input,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
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
export class MagaryTabs implements OnInit, AfterContentInit {
  @ContentChildren(MagaryTab) tabs!: QueryList<MagaryTab>;
  @ViewChild('tabHeaders') headersRef!: ElementRef<HTMLElement>;
  @ViewChildren('tabButton') buttonsRef!: QueryList<ElementRef<HTMLElement>>;
  public activeIndex = signal(0);
  public backgroundLine = input<string>('#000');
  public positionContent = input<string>('center');
  public background = input<string>('var(--surface-0)');
  public padding = input<string>('0');
  public heightLine = input<string>('5px');
  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.activeIndex.set(0);
    this.updateUnderlinePosition(0);

    // Initialize ResizeObserver to update underline on container resize
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

  ngAfterContentInit() {
    const tabsArray = this.tabs.toArray();
    if (tabsArray.length > 0) {
      tabsArray[0].active.set(true);
    }
    // Recalculate after content init to ensure correct initial width
    setTimeout(() => {
      this.updateUnderlinePosition(this.activeIndex());
    }, 100);
  }
  public selectTab(index: number) {
    this.tabs.forEach((tab, i) => tab.active.set(i === index));
    this.activeIndex.set(index);
    this.updateUnderlinePosition(index);
  }
  private updateUnderlinePosition(index: number) {
    // Use requestAnimationFrame for smoother updates during resize
    requestAnimationFrame(() => {
      const activeBtn = this.buttonsRef?.toArray()[index]?.nativeElement;
      const headersEl = this.headersRef?.nativeElement;
      if (activeBtn && headersEl) {
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        headersEl.style.setProperty('--underline-left', `${left}px`);
        headersEl.style.setProperty('--underline-width', `${width}px`);
      }
    });
  }
}
