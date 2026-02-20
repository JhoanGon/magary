import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MagaryButton,
  MagaryToastService,
  MagaryTabs,
  MagaryTab,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

interface CodeExample {
  label: string;
  code: string;
  language: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'demo' | 'table' | 'list';
  content?: { code: string; language: string };
  codeExamples?: CodeExample[];
  tableData?: any[];
  listItems?: string[];
  demoConfig?: any;
}

@Component({
  selector: 'app-view-toast',
  imports: [CommonModule, MagaryButton, Highlight, MagaryTabs, MagaryTab],
  templateUrl: './view-toast.html',
  styleUrl: './view-toast.scss',
})
export class ViewToast {
  private toastService = inject(MagaryToastService);

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  get sections(): Section[] {
    return [
      {
        id: 'import',
        title: 'Import',
        description:
          'Importa el servicio y el componente en tu aplicación. El componente <magary-toast> debe colocarse en el root (ej. app.component.html).',
        type: 'code',
        content: {
          code: `import { MagaryToastService, MagaryToast } from 'ng-magary';`,
          language: 'typescript',
        },
      },
      {
        id: 'basic',
        title: 'Uso Básico',
        description:
          'Inyecta el servicio MagaryToastService y utiliza el método add() para mostrar notificaciones.',
        type: 'demo',
        codeExamples: [
          { label: 'HTML', code: this.exampleBasicHtml, language: 'html' },
          { label: 'TS', code: this.exampleBasicTs, language: 'typescript' },
        ],
      },
      {
        id: 'types',
        title: 'Tipos de Mensaje',
        description:
          'Existen 4 tipos de notificaciones: success, info, warning y error.',
        type: 'demo',
        codeExamples: [
          { label: 'TS', code: this.exampleTypesTs, language: 'typescript' },
        ],
      },
      {
        id: 'sticky',
        title: 'Sticky',
        description:
          'Las notificaciones sticky no desaparecen automáticamente, requieren acción del usuario para cerrarse.',
        type: 'demo',
        codeExamples: [
          { label: 'TS', code: this.exampleStickyTs, language: 'typescript' },
        ],
      },
      {
        id: 'api-toast',
        title: 'Toast Interface',
        description: 'Propiedades del objeto Toast.',
        type: 'table',
        tableData: [
          {
            name: 'type',
            type: "'success' | 'info' | 'warning' | 'error'",
            default: "'info'",
            description:
              'Define el estilo visual y el icono de la notificación.',
          },
          {
            name: 'title',
            type: 'string',
            default: '-',
            description: 'Título de la notificación.',
          },
          {
            name: 'message',
            type: 'string',
            default: '-',
            description: 'Contenido del mensaje.',
          },
          {
            name: 'duration',
            type: 'number',
            default: '3000',
            description: 'Tiempo en ms antes del cierre automático.',
          },
          {
            name: 'life',
            type: 'number',
            default: '3000',
            description: 'Alias para duration (compatibilidad).',
          },
          {
            name: 'sticky',
            type: 'boolean',
            default: 'false',
            description: 'Si es true, no se cierra automáticamente.',
          },
          {
            name: 'icon',
            type: 'string',
            default: '-',
            description: 'Clase CSS para icono personalizado (ej. "user").',
          },
          {
            name: 'id',
            type: 'string',
            default: 'auto',
            description: 'Identificador único (opcional).',
          },
          {
            name: 'data',
            type: 'any',
            default: '-',
            description: 'Datos arbitrarios asociados al toast.',
          },
        ],
      },
      {
        id: 'api-component',
        title: 'MagaryToast (Component)',
        description: 'Inputs del componente contenedor <magary-toast>.',
        type: 'table',
        tableData: [
          {
            name: 'position',
            type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' ...",
            default: "'top-right'",
            description: 'Posición de las notificaciones en pantalla.',
          },
          {
            name: 'baseZIndex',
            type: 'number',
            default: '1100',
            description: 'Z-index base para el contenedor.',
          },
          {
            name: 'offsetX',
            type: 'string',
            default: "'1rem'",
            description:
              'Separación horizontal desde el borde en posiciones left/right.',
          },
          {
            name: 'offsetY',
            type: 'string',
            default: "'1rem'",
            description:
              'Separación vertical desde el borde en posiciones top/bottom.',
          },
        ],
      },
    ];
  }

  // Demo Actions
  showSuccess() {
    this.toastService.add({
      type: 'success',
      title: 'Éxito',
      message: 'Operación completada correctamente.',
    });
  }

  showInfo() {
    this.toastService.add({
      type: 'info',
      title: 'Información',
      message: 'Nueva versión disponible.',
    });
  }

  showWarning() {
    this.toastService.add({
      type: 'warning',
      title: 'Advertencia',
      message: 'Tu sesión expirará pronto.',
    });
  }

  showError() {
    this.toastService.add({
      type: 'error',
      title: 'Error',
      message: 'Ha ocurrido un error inesperado.',
    });
  }

  showSticky() {
    this.toastService.add({
      type: 'info',
      title: 'Sticky Toast',
      message: 'Este mensaje permanecerá hasta que lo cierres.',
      sticky: true,
    });
  }

  // Code Examples
  exampleBasicTs = `import { Component, inject } from '@angular/core';
import { MagaryToastService } from 'ng-magary';

@Component({ ... })
export class MyComponent {
  // Inyección moderna del servicio
  private toastService = inject(MagaryToastService);

  showToast() {
    this.toastService.add({
      type: 'success', // 'success' | 'info' | 'warning' | 'error'
      title: 'Hola Mundo',
      message: 'Esta es una notificación completa.',
      duration: 5000,  // Duración personalizada (ms)
      icon: 'rocket', // Icono personalizado
      sticky: false,   // Auto-dismiss
    });
  }
}`;

  exampleBasicHtml = `<!-- En tu layout principal (ej. app.component.html) -->
<magary-toast position="top-right" offsetY="5rem"></magary-toast>

<!-- En tu template -->
<magary-button (click)="showToast()" label="Mostrar Toast"></magary-button>`;

  exampleTypesTs = `// Diferentes tipos de mensajes
this.toastService.add({ type: 'success', title: 'Éxito', message: 'Todo salió bien' });
this.toastService.add({ type: 'info', title: 'Info', message: 'Información útil' });
this.toastService.add({ type: 'warning', title: 'Cuidado', message: 'Algo no anda bien' });
this.toastService.add({ type: 'error', title: 'Error', message: 'Falló la operación' });`;

  exampleStickyTs = `this.toastService.add({
  type: 'info',
  title: 'Sticky',
  message: 'No me iré hasta que me cierres manualmente.',
  sticky: true // Desactiva el cierre automático
});`;
}
