import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  booleanAttribute,
  input,
  output,
  contentChildren,
  effect,
  inject,
  Injector,
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
      // Logic to handle tab state changes if needed.
      // However, managing state from parent to children via signals is different.
      // Ideally, tabs should drive their own state or use a service/model.
      // But keeping existing logic:
      const tabs = this.tabs();
      tabs.forEach((tab) => {
        // We can't subscribe to signals like observables easily here without effects.
        // But if AccordionTab uses output() for selection change, we can't easily listen to it via contentChildren.
        // The pattern of "Parent listens to ContentChildren outputs" is hard with Signals directly.
        // Alternative: Pass this Accordion instance to Tabs via Dependency Injection.
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
