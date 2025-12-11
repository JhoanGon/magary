import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  signal,
  OnDestroy,
  inject,
  contentChild,
  TemplateRef,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryDialog } from '../dialog/dialog';
import { MagaryButton } from '../../Button/button/button';
import {
  MagaryConfirmationService,
  Confirmation,
} from './confirmation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'magary-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MagaryDialog, MagaryButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MagaryConfirmDialog implements OnDestroy {
  header = input<string>();
  icon = input<string>();
  message = input<string>();
  key = input<string>();

  acceptLabel = input<string>('Yes');
  rejectLabel = input<string>('No');

  acceptIcon = input<string>();
  rejectIcon = input<string>();

  acceptVisible = input<boolean>(true);
  rejectVisible = input<boolean>(true);

  dismissableMask = input<boolean>(false);
  closeOnEscape = input<boolean>(true);

  // State
  visible = signal<boolean>(false);
  confirmation = signal<Confirmation | null>(null);

  private subscription: Subscription;
  private confirmationService = inject(MagaryConfirmationService);

  constructor() {
    this.subscription = this.confirmationService.requireConfirmation$.subscribe(
      (confirmation) => {
        if (!confirmation) {
          this.hide();
          return;
        }

        if (confirmation.key === this.key()) {
          this.confirmation.set(confirmation);
          this.visible.set(true);
        }
      },
    );
  }

  accept() {
    if (this.confirmation()?.accept) {
      this.confirmation()!.accept!();
    }
    this.hide();
  }

  reject() {
    if (this.confirmation()?.reject) {
      this.confirmation()!.reject!();
    }
    this.hide();
  }

  hide() {
    this.visible.set(false);
    this.confirmation.set(null);
  }

  // Computed values merging Input defaults with Confirmation object overrides
  effectiveHeader = computed(
    () => this.confirmation()?.header || this.header(),
  );
  effectiveMessage = computed(
    () => this.confirmation()?.message || this.message(),
  );
  effectiveIcon = computed(() => this.confirmation()?.icon || this.icon());
  effectiveAcceptLabel = computed(
    () => this.confirmation()?.acceptLabel || this.acceptLabel(),
  );
  effectiveRejectLabel = computed(
    () => this.confirmation()?.rejectLabel || this.rejectLabel(),
  );
  effectiveAcceptVisible = computed(() =>
    this.confirmation()?.acceptVisible !== undefined
      ? this.confirmation()!.acceptVisible
      : this.acceptVisible(),
  );
  effectiveRejectVisible = computed(() =>
    this.confirmation()?.rejectVisible !== undefined
      ? this.confirmation()!.rejectVisible
      : this.rejectVisible(),
  );

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
