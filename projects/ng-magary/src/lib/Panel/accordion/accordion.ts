import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  booleanAttribute,
  input,
  output,
  contentChildren,
  effect,
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
export class MagaryAccordion {
  multiple = input<boolean, unknown>(false, { transform: booleanAttribute });

  tabs = contentChildren(MagaryAccordionTab);

  onClose = output<any>();
  onOpen = output<any>();

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      tabs.forEach((tab) => {
        tab.accordion = this;
      });
    });
  }

  handleTabChange(changedTab: MagaryAccordionTab, isSelected: boolean) {
    if (isSelected) {
      this.onOpen.emit({
        originalEvent: null,
        index: this.findTabIndex(changedTab),
      });

      if (!this.multiple()) {
        this.tabs().forEach((tab) => {
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
    return this.tabs().indexOf(tab);
  }
}
