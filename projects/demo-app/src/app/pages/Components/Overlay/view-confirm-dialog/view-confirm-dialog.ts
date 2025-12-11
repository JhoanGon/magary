import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import {
  MagaryButton,
  MagaryConfirmDialog,
  MagaryConfirmationService,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';

@Component({
  selector: 'app-view-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    Highlight,
    MagaryButton,
    MagaryConfirmDialog,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
  ],
  providers: [MagaryConfirmationService],
  templateUrl: './view-confirm-dialog.html',
  styleUrl: './view-confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewConfirmDialog {
  private confirmationService = inject(MagaryConfirmationService);

  readonly tabsConfig = {
    backgroundLine: 'rgba(255, 255, 255, 0.1)',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  confirm1() {
    this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres realizar esta acción?',
      icon: 'triangle-alert',
      accept: () => {
        // Accion aceptada
        console.log('Aceptado');
      },
      reject: () => {
        // Accion rechazada
        console.log('Rechazado');
      },
    });
  }

  confirm2() {
    this.confirmationService.confirm({
      header: 'Eliminar Registro',
      message: '¿Deseas eliminar este registro permanentemente?',
      icon: 'trash-2',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        // Delete logic
      },
    });
  }

  readonly exampleHTML = `<!-- En tu template -->
<magary-confirm-dialog></magary-confirm-dialog>
<magary-button (buttonClick)="confirm1()" label="Confirmar"></magary-button>
`;

  readonly exampleTS = `
constructor(private confirmationService: MagaryConfirmationService) {}

confirm1() {
  this.confirmationService.confirm({
      header: 'Confirmación',
      message: '¿Estás seguro?',
      icon: 'triangle-alert',
      accept: () => {
          // Accepted
      }
  });
}
`;
}
