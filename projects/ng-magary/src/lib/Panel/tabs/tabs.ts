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
  public background = input<string>('#fff');
  public padding = input<string>('0');
  public heightLine = input<string>('5px');
  ngOnInit(): void {
    this.activeIndex.set(0);
    this.updateUnderlinePosition(0);
  }
  ngAfterContentInit() {
    const tabsArray = this.tabs.toArray();
    if (tabsArray.length > 0) {
      tabsArray[0].active.set(true);
    }
  }
  public selectTab(index: number) {
    this.tabs.forEach((tab, i) => tab.active.set(i === index));
    this.activeIndex.set(index);
    this.updateUnderlinePosition(index);
  }
  private updateUnderlinePosition(index: number) {
    setTimeout(() => {
      const activeBtn = this.buttonsRef.toArray()[index]?.nativeElement;
      const headersEl = this.headersRef.nativeElement;
      if (activeBtn && headersEl) {
        const left = activeBtn.offsetLeft;
        const width = activeBtn.offsetWidth;
        headersEl.style.setProperty('--underline-left', `${left}px`);
        headersEl.style.setProperty('--underline-width', `${width}px`);
      }
    }, 0);
  }
}
