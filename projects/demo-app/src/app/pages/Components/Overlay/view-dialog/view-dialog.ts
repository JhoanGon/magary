import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryDialog,
  MagaryButton,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

const CODE_EXAMPLES = {
  import: `import { MagaryDialog } from 'ng-magary';`,
  basic: `<magary-button (buttonClick)="visible = true" label="Mostrar"></magary-button>
<magary-dialog header="Simple Dialog" [(visible)]="visible" width="50vw" [dismissableMask]="true" [resizable]="true" [draggable]="false">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
        <magary-button (buttonClick)="visible = false" label="Cancelar" severity="secondary" variant="text"></magary-button>
        <magary-button (buttonClick)="visible = false" label="Confirmar" severity="primary"></magary-button>
    </div>
</magary-dialog>`,
  modal: `<magary-button (buttonClick)="visibleModal = true" label="Mostrar Modal" severity="info"></magary-button>

<magary-dialog header="Modal Dialog" [(visible)]="visibleModal" [modal]="true" width="50vw" [draggable]="false">
    <p>
        Este es un diálogo modal. El fondo está bloqueado. No se cierra al hacer clic fuera (dismissableMask=false).
    </p>
</magary-dialog>`,
  maximizable: `<magary-button (buttonClick)="visibleMax = true" label="Mostrar Maximizable" severity="help"></magary-button>

<magary-dialog header="Maximizable Dialog" [(visible)]="visibleMax" [maximizable]="true" width="50vw" [draggable]="false">
    <p>
        Haz clic en el icono de expandir en la cabecera para ver el efecto.
    </p>
    @for (item of [1, 2, 3, 4, 5]; track $index) {
        <p>
            Contenido de relleno para demostrar el scroll y layout...
        </p>
    }
</magary-dialog>`,
};

@Component({
  selector: 'view-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MagaryDialog,
    MagaryButton,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-dialog.html',
  styleUrls: ['./view-dialog.scss'],
})
export class ViewDialog {
  visible: boolean = false;
  visibleModal: boolean = false;
  visibleMax: boolean = false;
  visibleNoMask: boolean = false;
  visibleInteractive: boolean = false;
  visibleDrag: boolean = false;
  visibleResize: boolean = false;
  visiblePos: boolean = false;
  visibleGlass: boolean = false;

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleModal = CODE_EXAMPLES.modal;
  readonly exampleMaximizable = CODE_EXAMPLES.maximizable;

  readonly exampleGlass = `<magary-button (buttonClick)="visibleGlass = true" label="Glass Effect" severity="contrast"></magary-button>

<magary-dialog 
    header="Glassmorphism Premium" 
    [(visible)]="visibleGlass" 
    [glass]="true" 
    width="40vw">
    <p>
        Este diálogo utiliza el efecto <b>Glass</b> nativo.
        Combina desenfoque de fondo con transparencia ajustada.
    </p>
</magary-dialog>`;

  readonly exampleDraggable = `<magary-button (buttonClick)="visibleDrag = true" label="Draggable Dialog" severity="warning"></magary-button>

<magary-dialog header="Arrastrame" [(visible)]="visibleDrag" [draggable]="true" [modal]="false" width="30vw">
    <p>
        Este diálogo se puede arrastrar desde el encabezado.
        Nota que [modal]="false" permite interactuar con el fondo.
    </p>
</magary-dialog>`;

  readonly exampleResizable = `<magary-button (buttonClick)="visibleResize = true" label="Resizable Dialog" severity="success"></magary-button>

<magary-dialog header="Redimensioname" [(visible)]="visibleResize" [resizable]="true" width="50vw" [style]="{minHeight: '300px'}">
    <p>
        Este diálogo tiene un manejador en la esquina inferior derecha.
        Intenta cambiar su tamaño.
    </p>
</magary-dialog>`;

  readonly examplePosition = `<magary-button (buttonClick)="visiblePos = true" label="Custom Position" severity="help"></magary-button>

<magary-dialog 
    header="Posición & Glass" 
    [(visible)]="visiblePos" 
    position="top-right" 
    width="30vw" 
    [glass]="true">
    <p>
        Este diálogo usa las nuevas propiedades:
        position="top-right" y glass="true".
    </p>
</magary-dialog>`;

  readonly exampleInteractive = `<div style="position: relative; height: 500px; overflow: hidden;">
    <magary-dialog 
        [(visible)]="visibleInteractive" 
        header="Container Dialog"
        [draggable]="true" 
        [resizable]="true" 
        [maximizable]="true"
        appendTo="local"
        [maximizable]="true"
        appendTo="local"
        [modal]="false"
        width="300px">
        <p>
            Limitado al contenedor padre.
        </p>
    </magary-dialog>
</div>`;

  showDialog() {
    this.visible = true;
  }

  showModal() {
    this.visibleModal = true;
  }

  showMax() {
    this.visibleMax = true;
  }

  showNoMask() {
    this.visibleNoMask = true;
  }

  showInteractive() {
    this.visibleInteractive = true;
  }
}
