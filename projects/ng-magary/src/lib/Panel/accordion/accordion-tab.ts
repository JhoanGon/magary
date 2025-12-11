import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  booleanAttribute,
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
  @Input() header: string | undefined;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  // Using signals for internal state
  readonly selected = signal<boolean>(false);

  @Input('selected') set _selected(val: boolean) {
    this.selected.set(val);
  }

  @Output() selectedChange = new EventEmitter<boolean>();

  toggle(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const newState = !this.selected();
    this.selected.set(newState);
    this.selectedChange.emit(newState);

    event.preventDefault();
  }

  close() {
    this.selected.set(false);
    // We don't emit selectedChange here to avoid infinite loops if parent triggered it,
    // but if parent triggered it via logic, we might need to.
    // Current parent logic calls this.close(), so we shouldn't emit back to parent
    // for the same event loop.
  }
}
