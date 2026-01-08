import {
  ChangeDetectionStrategy,
  Component,
  output,
  inject,
  signal,
  ViewEncapsulation,
  ElementRef,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  animate,
  style,
  transition,
  trigger,
  state,
} from '@angular/animations';

@Component({
  selector: 'magary-fieldset',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './fieldset.html',
  styleUrl: './fieldset.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fieldsetContent', [
      state(
        'hidden',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        }),
      ),
      state(
        'visible',
        style({
          height: '*',
          opacity: 1,
        }),
      ),
      transition('visible <=> hidden', [
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ]),
      transition('void => visible', [
        style({ height: '0', opacity: 0 }),
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ]),
    ]),
  ],
})
export class MagaryFieldset {
  legend = input<string>('');
  toggleable = input<boolean>(false);

  collapsed = model(false);

  onBeforeToggle = output<any>();
  onAfterToggle = output<any>();

  toggle(event: Event) {
    if (this.toggleable()) {
      event.preventDefault();

      const collapsed = this.collapsed();
      this.onBeforeToggle.emit({ originalEvent: event, collapsed: !collapsed });

      this.collapsed.set(!collapsed);

      this.onAfterToggle.emit({ originalEvent: event, collapsed: !collapsed });
    }
  }

  expand(event: Event) {
    if (this.toggleable() && this.collapsed()) {
      this.toggle(event);
    }
  }

  collapse(event: Event) {
    if (this.toggleable() && !this.collapsed()) {
      this.toggle(event);
    }
  }
}
