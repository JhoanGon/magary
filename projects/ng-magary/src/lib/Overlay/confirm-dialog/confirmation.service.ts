import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Public payload accepted by MagaryConfirmationService.confirm(). */
export interface MagaryConfirmation {
  message?: string;
  key?: string;
  icon?: string;
  header?: string;
  accept?: () => void;
  reject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  style?: Record<string, unknown> | null;
  styleClass?: string;
  defaultFocus?: 'accept' | 'reject' | 'none';
}

@Injectable({
  providedIn: 'root',
})
export class MagaryConfirmationService {
  private requireConfirmationSource = new Subject<MagaryConfirmation | null>();
  private acceptConfirmationSource = new Subject<MagaryConfirmation | null>();

  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  acceptConfirmation$ = this.acceptConfirmationSource.asObservable();

  confirm(confirmation: MagaryConfirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }

  close() {
    this.requireConfirmationSource.next(null);
    return this;
  }

  onAccept() {
    this.acceptConfirmationSource.next(null);
  }
}
