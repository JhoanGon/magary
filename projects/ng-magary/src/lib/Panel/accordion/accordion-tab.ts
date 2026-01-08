import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  booleanAttribute,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryAccordion } from './accordion';

@Component({
  selector: 'magary-accordion-tab',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './accordion-tab.html',
  styleUrls: ['./accordion.scss'], // Shared styles
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('tabContent', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
          paddingTop: '0',
          paddingBottom: '0',
          opacity: '0',
        }),
      ),
      state(
        'visible',
        style({
          height: '*',
          overflow: 'hidden',
          paddingTop: '*',
          paddingBottom: '*',
          opacity: '1',
        }),
      ),
      transition('hidden <=> visible', [
        animate('0.3s cubic-bezier(0.87, 0, 0.13, 1)'),
      ]),
    ]),
  ],
})
export class MagaryAccordionTab {
  header = input<string>();
  disabled = input(false, { transform: booleanAttribute });
  selected = model(false);

  accordion: MagaryAccordion | undefined;

  toggle(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    const newState = !this.selected();
    this.selected.set(newState);

    // Notify parent
    if (this.accordion) {
      this.accordion.handleTabChange(this, newState);
    }

    event.preventDefault();
  }

  close() {
    this.selected.set(false);
  }
}
