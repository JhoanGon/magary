import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Toast } from './toast.service';

@Component({
  selector: 'magary-toast-item',
  imports: [CommonModule],
  templateUrl: './toast-item.html',
  styleUrl: './toast-item.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MagaryToastItem {
  @Input({ required: true }) toast!: Toast;
  @Output() onClose = new EventEmitter<string>();

  get iconClass(): string {
    if (this.toast.icon) return this.toast.icon;

    switch (this.toast.type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-times-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  }

  close() {
    if (this.toast.id) {
      this.onClose.emit(this.toast.id);
    }
  }
}
