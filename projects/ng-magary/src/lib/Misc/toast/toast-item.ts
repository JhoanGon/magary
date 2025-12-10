import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Toast } from './toast.service';

@Component({
  selector: 'magary-toast-item',
  imports: [CommonModule, LucideAngularModule],
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
        return 'circle-check';
      case 'error':
        return 'circle-x';
      case 'warning':
        return 'triangle-alert';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  close() {
    if (this.toast.id) {
      this.onClose.emit(this.toast.id);
    }
  }
}
