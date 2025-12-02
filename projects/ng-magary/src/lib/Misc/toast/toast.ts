import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { MagaryToastItem } from './toast-item';
import { MagaryToastService } from './toast.service';
import {
  animate,
  style,
  transition,
  trigger,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'magary-toast',
  imports: [CommonModule, MagaryToastItem],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate(
          '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(100%)', opacity: 0 }),
        ),
      ]),
    ]),
  ],
})
export class MagaryToast {
  private toastService = inject(MagaryToastService);

  @Input() position:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
    | 'center' = 'top-right';
  @Input() baseZIndex: number = 1000;

  get toasts() {
    return this.toastService.toasts();
  }

  onToastClose(id: string) {
    this.toastService.remove(id);
  }
}
