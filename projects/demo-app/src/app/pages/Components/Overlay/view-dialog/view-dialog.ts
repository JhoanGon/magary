import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryDialog,
  MagaryButton,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

const CODE_EXAMPLES = {
  import: `import { MagaryDialog } from 'ng-magary';`,
  basic: `<magary-button (buttonClick)="visible = true" label="Show"></magary-button>
<magary-dialog
    header="Simple Dialog"
    [(visible)]="visible"
    width="min(90vw, 48rem)"
    [dismissableMask]="true"
    [resizable]="true"
    [draggable]="false">
    <p>Your content...</p>
</magary-dialog>`,
  modal: `<magary-button (buttonClick)="visibleModal = true" label="Show Modal" severity="info"></magary-button>

<magary-dialog header="Modal Dialog" [(visible)]="visibleModal" [modal]="true" width="min(90vw, 48rem)" [draggable]="false">
    <p>This is a modal dialog.</p>
</magary-dialog>`,
  maximizable: `<magary-button (buttonClick)="visibleMax = true" label="Show Maximizable" severity="help"></magary-button>

<magary-dialog header="Maximizable Dialog" [(visible)]="visibleMax" [maximizable]="true" width="min(90vw, 48rem)" [draggable]="false">
    <p>Click maximize in the header.</p>
</magary-dialog>`,
};

type DialogInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
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
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  visible = false;
  visibleModal = false;
  visibleMax = false;
  visibleNoMask = false;
  visibleInteractive = false;
  visibleDrag = false;
  visibleResize = false;
  visiblePos = false;
  visibleGlass = false;
  readonly demoDialogBackground = 'var(--surface-0)';

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleModal = CODE_EXAMPLES.modal;
  readonly exampleMaximizable = CODE_EXAMPLES.maximizable;

  readonly inputRows: DialogInputRow[] = [
    {
      name: 'header',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.header.desc',
    },
    {
      name: 'visible',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.dialog.api.visible.desc',
    },
    {
      name: 'modal',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.modal.desc',
    },
    {
      name: 'maximizable',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.dialog.api.maximizable.desc',
    },
    {
      name: 'dismissableMask',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.dialog.api.dismissableMask.desc',
    },
    {
      name: 'closeOnEscape',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.closeOnEscape.desc',
    },
    {
      name: 'trapFocus',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.trapFocus.desc',
    },
    {
      name: 'autoFocus',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.autoFocus.desc',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Dialog'",
      descriptionKey: 'components.overlay.dialog.api.ariaLabel.desc',
    },
    {
      name: 'draggable',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.draggable.desc',
    },
    {
      name: 'resizable',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.dialog.api.resizable.desc',
    },
    {
      name: 'appendTo',
      type: "'body' | 'local'",
      default: "'body'",
      descriptionKey: 'components.overlay.dialog.api.appendTo.desc',
    },
    {
      name: 'position',
      type: 'string',
      default: "'center'",
      descriptionKey: 'components.overlay.dialog.api.position.desc',
    },
    {
      name: 'width',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.width.desc',
    },
    {
      name: 'height',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.height.desc',
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.backgroundColor.desc',
    },
    {
      name: 'headerBackground',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.headerBackground.desc',
    },
    {
      name: 'contentBackground',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.contentBackground.desc',
    },
    {
      name: 'footerBackground',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.overlay.dialog.api.footerBackground.desc',
    },
    {
      name: 'showBorder',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.showBorder.desc',
    },
    {
      name: 'showSectionBorders',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.overlay.dialog.api.showSectionBorders.desc',
    },
    {
      name: 'glass',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.overlay.dialog.api.glass.desc',
    },
  ];

  readonly exampleGlass = `<magary-button (buttonClick)="visibleGlass = true" label="Glass Effect" severity="contrast"></magary-button>

<magary-dialog
    header="Glassmorphism Premium"
    [(visible)]="visibleGlass"
    [glass]="true"
    width="min(92vw, 36rem)">
    <p>This dialog uses the native Glass effect.</p>
</magary-dialog>`;

  readonly exampleDraggable = `<magary-button (buttonClick)="visibleDrag = true" label="Draggable Dialog" severity="warning"></magary-button>

<magary-dialog header="Drag me" [(visible)]="visibleDrag" [draggable]="true" [modal]="false" width="min(92vw, 32rem)">
    <p>This dialog can be dragged from header.</p>
</magary-dialog>`;

  readonly exampleResizable = `<magary-button (buttonClick)="visibleResize = true" label="Resizable Dialog" severity="success"></magary-button>

<magary-dialog header="Resize me" [(visible)]="visibleResize" [resizable]="true" width="min(92vw, 40rem)" [style]="{minHeight: '300px'}">
    <p>This dialog has resize handle.</p>
</magary-dialog>`;

  readonly examplePosition = `<magary-button (buttonClick)="visiblePos = true" label="Custom Position" severity="help"></magary-button>

<magary-dialog
    header="Position & Glass"
    [(visible)]="visiblePos"
    position="top-right"
    width="min(92vw, 32rem)"
    [glass]="true">
    <p>This dialog uses custom position and glass.</p>
</magary-dialog>`;

  readonly exampleInteractive = `<div style="position: relative; height: 500px; overflow: hidden;">
    <magary-dialog
        [(visible)]="visibleInteractive"
        header="Container Dialog"
        [draggable]="true"
        [resizable]="true"
        [maximizable]="true"
        appendTo="local"
        [modal]="false"
        width="300px">
        <p>Limited to parent container.</p>
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
