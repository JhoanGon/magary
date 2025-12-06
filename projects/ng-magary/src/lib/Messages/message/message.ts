import {
  Component,
  Input,
  Output,
  EventEmitter,
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

@Component({
  selector: 'magary-message',
  standalone: true,
  imports: [CommonModule],
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
  @Input() severity:
    | 'success'
    | 'info'
    | 'warn'
    | 'error'
    | 'secondary'
    | 'contrast' = 'info';

  @Input() text: string | undefined;

  @Input() detail: string | undefined;

  @Input() icon: string | undefined;

  @Input() closable: boolean = false;

  @Input() life: number | undefined;

  @Output() onClose = new EventEmitter<Event>();

  visible: boolean = true;

  ngOnInit() {
    if (this.life) {
      setTimeout(() => {
        this.close(null);
      }, this.life);
    }
  }

  get iconClass(): string {
    if (this.icon) {
      return this.icon;
    }

    switch (this.severity) {
      case 'success':
        return 'fas fa-check-circle';
      case 'info':
        return 'fas fa-info-circle';
      case 'warn':
        return 'fas fa-exclamation-triangle';
      case 'error':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-info-circle';
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
