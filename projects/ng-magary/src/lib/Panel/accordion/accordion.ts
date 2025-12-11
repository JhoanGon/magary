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
export class MagaryAccordion implements AfterContentInit {
  @Input({ transform: booleanAttribute }) multiple: boolean = false;

  @ContentChildren(MagaryAccordionTab) tabs!: QueryList<MagaryAccordionTab>;

  @Output() onClose = new EventEmitter<any>();
  @Output() onOpen = new EventEmitter<any>();

  ngAfterContentInit() {
    this.tabs.changes.subscribe(() => {
      this.initTabs();
    });
    this.initTabs();
  }

  initTabs() {
    this.tabs.forEach((tab) => {
      // Clean up old subscriptions if any (basic implementation)
      if ((tab as any).toggleSubscription) {
        (tab as any).toggleSubscription.unsubscribe();
      }

      (tab as any).toggleSubscription = tab.selectedChange.subscribe(
        (selected: boolean) => {
          this.handleTabChange(tab, selected);
        },
      );
    });
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
