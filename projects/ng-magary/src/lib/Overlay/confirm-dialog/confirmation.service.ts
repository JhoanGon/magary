import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Confirmation {
  message?: string;
  key?: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  style?: any;
  styleClass?: string;
  defaultFocus?: 'accept' | 'reject' | 'none';
}

@Injectable({
  providedIn: 'root',
})
export class MagaryConfirmationService {
  private requireConfirmationSource = new Subject<Confirmation>();
  private acceptConfirmationSource = new Subject<Confirmation>();

  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  acceptConfirmation$ = this.acceptConfirmationSource.asObservable();

  confirm(confirmation: Confirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }

  close() {
    this.requireConfirmationSource.next(null as any);
    return this;
  }

  onAccept() {
    this.acceptConfirmationSource.next(null as any);
  }
}
