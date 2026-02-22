import { Injectable, signal } from '@angular/core';

export interface Toast {
  id?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message?: string;
  icon?: string;
  duration?: number;
  life?: number; // alias for duration
  sticky?: boolean;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class MagaryToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  add(toast: Toast) {
    const id = toast.id || this.generateId();
    const newToast = { ...toast, id };

    this._toasts.update((current) => [...current, newToast]);

    if (!newToast.sticky) {
      const duration = newToast.life || newToast.duration || 3000;
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  remove(id: string) {
    this._toasts.update((current) => current.filter((t) => t.id !== id));
  }

  clear() {
    this._toasts.set([]);
  }

  private generateId(): string {
    return 'toast-' + Math.random().toString(36).substr(2, 9);
  }
}
