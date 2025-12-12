import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  AfterContentInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryAccordionTab } from './accordion-tab';

import { OnDestroy } from '@angular/core';

@Component({
  selector: 'magary-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    class: 'magary-accordion',
  },
})
export class MagaryAccordion implements AfterContentInit, OnDestroy {
  @Input({ transform: booleanAttribute }) multiple: boolean = false;

  @ContentChildren(MagaryAccordionTab) tabs!: QueryList<MagaryAccordionTab>;

  @Output() onClose = new EventEmitter<any>();
  @Output() onOpen = new EventEmitter<any>();

  private subscriptions: any[] = [];

  ngAfterContentInit() {
    this.tabs.changes.subscribe(() => {
      this.initTabs();
    });
    this.initTabs();
  }

  initTabs() {
    // Clear old subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];

    this.tabs.forEach((tab) => {
      const sub = tab.selectedChange.subscribe((selected: boolean) => {
        this.handleTabChange(tab, selected);
      });
      this.subscriptions.push(sub);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  handleTabChange(changedTab: MagaryAccordionTab, isSelected: boolean) {
    if (isSelected) {
      this.onOpen.emit({
        originalEvent: null,
        index: this.findTabIndex(changedTab),
      });

      if (!this.multiple) {
        this.tabs.forEach((tab) => {
          if (tab !== changedTab && tab.selected()) {
            tab.close();
          }
        });
      }
    } else {
      this.onClose.emit({
        originalEvent: null,
        index: this.findTabIndex(changedTab),
      });
    }
  }

  findTabIndex(tab: MagaryAccordionTab): number {
    return this.tabs.toArray().indexOf(tab);
  }
}
