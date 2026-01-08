import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
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
  toast = input.required<Toast>();
  onClose = output<string>();

  iconClass = computed(() => {
    const t = this.toast();
    if (t.icon) return t.icon;

    switch (t.type) {
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
  });

  close() {
    const t = this.toast();
    if (t.id) {
      this.onClose.emit(t.id);
    }
  }
}
