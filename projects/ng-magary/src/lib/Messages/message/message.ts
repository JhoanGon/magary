import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
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
  selector: 'magary-message',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './message.html',
  styleUrls: ['./message.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-message-wrapper',
  },
  animations: [
    trigger('messageAnimation', [
      state(
        'visible',
        style({
          transform: 'translateY(0) scale(1)',
          opacity: 1,
          height: '*',
          marginTop: '*',
          marginBottom: '*',
        }),
      ),
      transition('void => *', [
        style({
          transform: 'translateY(-20px) scale(0.95)',
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
        }),
        animate(
          '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'translateY(0) scale(1)',
            opacity: 1,
            height: '*',
            marginTop: '*',
            marginBottom: '*',
          }),
        ),
      ]),
      transition('* => void', [
        style({
          transform: 'translateY(0) scale(1)',
          opacity: 1,
          height: '*',
          marginTop: '*',
          marginBottom: '*',
        }),
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({
            transform: 'translateY(-20px) scale(0.95)',
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class MagaryMessage {
  severity = input<
    'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  >('info');

  text = input<string | undefined>(undefined);

  detail = input<string | undefined>(undefined);

  icon = input<string | undefined>(undefined);

  closable = input<boolean>(false);

  life = input<number | undefined>(undefined);

  onClose = output<Event>();

  visible: boolean = true;

  ngOnInit() {
    const life = this.life();
    if (life) {
      setTimeout(() => {
        this.close(null);
      }, life);
    }
  }

  get iconClass(): string {
    const icon = this.icon();
    if (icon) {
      return icon;
    }

    switch (this.severity()) {
      case 'success':
        return 'circle-check';
      case 'info':
        return 'info';
      case 'warn':
        return 'triangle-alert';
      case 'error':
        return 'circle-x';
      default:
        return 'info';
    }
  }

  close(event: Event | null) {
    this.visible = false;
    if (event) {
      this.onClose.emit(event);
      event.preventDefault();
    }
  }
}
