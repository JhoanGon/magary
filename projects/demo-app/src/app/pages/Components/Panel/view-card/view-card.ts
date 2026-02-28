import { Component, inject } from '@angular/core';
import {
  MagaryButton,
  MagaryCard,
  MagaryTab,
  MagaryTabs,
  MagaryToastService,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

const CODE_EXAMPLES = {
  BASIC_CARD: `
  <magary-card
    [width]="'300px'"
    [shadow]="5"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ccf0f7'"
  >
    <div slot="header">
      <h3>Encabezado</h3>
    </div>
    <p>Este es el contenido principal de la tarjeta.</p>
    <div slot="footer">
      <magary-button label="Click" severity="primary"></magary-button>
    </div>
  </magary-card>`,
  IMAGE_TOP: `
  <magary-card
    [img]="'/assets/Magary.png'"
    [positionImage]="'top'"
    [imageSize]="'250px'"
    [width]="'280px'"
    [shadow]="2"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ccf0f7'"
    [altText]="'Logo de Magary'"
    [imageFit]="'cover'"
  >
    <div slot="header">
      <h3>Encabezado</h3>
    </div>
    <p>Este es el contenido principal de la tarjeta.</p>
    <div slot="footer">
      <magary-button label="Click" severity="primary"></magary-button>
    </div>
  </magary-card>`,
} as const;

type CardInputRow = {
  name: string;
  type: string;
  default: string;
  descriptionKey: DocsTextKey;
};

type CardEventRow = {
  name: string;
  type: string;
  descriptionKey: DocsTextKey;
};

@Component({
  selector: 'magary-view-card',
  imports: [
    MagaryCard,
    MagaryButton,
    MagaryTabs,
    MagaryTab,
    Highlight,
    LucideAngularModule,
  ],
  templateUrl: './view-card.html',
  styleUrl: './view-card.scss',
})
export class ViewCard {
  private toastService: MagaryToastService = inject(MagaryToastService);
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  lastClickedCard = '';
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'warning' | 'error' | 'info' = 'success';

  readonly importExample = "import { MagaryCard } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC_CARD;
  readonly exampleImageTop = CODE_EXAMPLES.IMAGE_TOP;

  readonly exampleImageRight = `
  <magary-card
    [img]="'/assets/Magary.png'"
    [positionImage]="'right'"
    [imageSize]="'200px'"
    [width]="'350px'"
    [height]="'200px'"
    [shadow]="2"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ccf0f7'"
    [altText]="'Logo de Magary'"
    [imageFit]="'contain'"
    [responsive]="true"
  >
    <div slot="header">
      <h3>Encabezado</h3>
    </div>
    <p>Este es el contenido principal de la tarjeta.</p>
    <div slot="footer">
      <magary-button label="Click" severity="primary"></magary-button>
    </div>
  </magary-card>`;

  readonly exampleAdvanced1 = `
  <magary-card
    [width]="'280px'"
    [height]="'300px'"
    [shadow]="3"
    [borderRadius]="'1.5rem'"
    [backgroundColor]="'#f0f8ff'"
    [padding]="'1.5rem'"
    [gap]="'1.2rem'"
  >
    <div slot="header">
      <h3>Card con altura fija</h3>
    </div>
    <p>Esta tarjeta tiene una altura fija de 300px y padding personalizado.</p>
    <div slot="footer">
      <magary-button label="Accion" severity="secondary"></magary-button>
    </div>
  </magary-card>`;

  readonly exampleAdvanced2 = `
  <magary-card
    [img]="'/assets/Magary.png'"
    [positionImage]="'top'"
    [imageSize]="'150px'"
    [width]="'280px'"
    [shadow]="4"
    [borderRadius]="'0.5rem'"
    [backgroundColor]="'#ffe6f0'"
    [altText]="'Logo completo de Magary'"
    [imageFit]="'contain'"
  >
    <div slot="header">
      <h3>Imagen completa</h3>
    </div>
    <p>La imagen se ajusta completamente sin recortes.</p>
    <div slot="footer">
      <magary-button label="Ver mas" severity="primary"></magary-button>
    </div>
  </magary-card>`;

  readonly exampleStates1 = `
  <magary-card
    [width]="'280px'"
    [shadow]="2"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#e6f3ff'"
    [clickable]="true"
  >
    <div slot="header">
      <h3>Card Clickeable</h3>
    </div>
    <p>Esta tarjeta responde a clicks y eventos de teclado.</p>
    <div slot="footer">
      <span style="color: #0066cc;">Haz click aqui</span>
    </div>
  </magary-card>`;

  readonly exampleStates2 = `
  <magary-card
    [width]="'280px'"
    [shadow]="2"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#fff3e0'"
    [loading]="true"
    [loadingText]="'Procesando...'"
  >
    <div slot="header">
      <h3>Card con Loading</h3>
    </div>
    <p>Esta tarjeta muestra un estado de carga.</p>
    <div slot="footer">
      <magary-button label="Procesar" severity="primary"></magary-button>
    </div>
  </magary-card>`;

  readonly exampleVariants = `
  <!-- Variant Outlined -->
  <magary-card
    [width]="'280px'"
    [variant]="'outlined'"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ffffff'"
  >
    <div slot="header">
      <h3>Card Outlined</h3>
    </div>
    <p>Tarjeta con borde y sin sombra.</p>
    <div slot="footer">
      <magary-button label="Accion" severity="primary"></magary-button>
    </div>
  </magary-card>
  <!-- Variant Filled -->
  <magary-card
    [width]="'280px'"
    [variant]="'filled'"
    [borderRadius]="'1rem'"
    [hoverEffect]="false"
    [border]="'1px solid var(--surface-200)'"
  >
    <div slot="header">
      <h3>Card Filled</h3>
    </div>
    <p>Tarjeta con fondo gris, sin sombra y borde personalizado.</p>
    <div slot="footer">
      <magary-button label="Accion" severity="secondary"></magary-button>
    </div>
  </magary-card>`;

  readonly exampleEvents = `
  <!-- En el template -->
  <magary-card
    [clickable]="true"
    (cardClick)="onCardClick($event)"
  >
    <div slot="header">
      <h3>Card Clickeable</h3>
    </div>
    <p>Haz click para ver el evento.</p>
  </magary-card>
  <!-- En el componente TypeScript -->
  onCardClick(event: CustomEvent) {
    console.log('Card clicked!', event.detail);
  }`;

  readonly exampleNotifications = `
  onCardClick(event: Event): void {
    try {
      const customEvent = event as CustomEvent;
      this.showToastNotification('Card clickeada exitosamente!');
      this.showToastNotification('Card Interactive: Has clickeado una tarjeta de Magary', 'success');
    } catch (error) {
      console.warn('Error handling card click:', error);
      this.showToastNotification('Error al procesar el click', 'error');
    }
  }`;

  readonly exampleNotificationsTS = `
  private showToastNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'): void {
    this.toastService.add({
      type: type,
      title: type === 'success' ? 'Exito' : type === 'error' ? 'Error' : type === 'warning' ? 'Alerta' : 'Informacion',
      message: message,
      duration: 3000,
    });
  }
  onDemoButtonClick(action: string): void {
    switch (action) {
      case 'success':
        this.showToastNotification('Accion exitosa!', 'success');
        break;
      case 'error':
        this.showToastNotification('Error en la accion!', 'error');
        break;
      case 'info':
        this.showToastNotification('Informacion importante', 'info');
        break;
      case 'warning':
        this.showToastNotification('Alerta importante', 'warning');
        break;
    }
  }`;

  readonly exampleNotificationsHTML = `
  <!-- El contenedor <magary-toast> vive en el layout global -->

  <!-- Uso con MagaryButton dentro de Cards -->
  <magary-card [clickable]="true" (cardClick)="onCardClick($event)">
    <div slot="header">
      <h3>Success Actions</h3>
    </div>
    <p>Estas acciones muestran notificaciones de exito cuando se completan correctamente.</p>
    <div slot="footer">
      <magary-button
        label="Success Toast"
        severity="success"
        size="small"
        (click)="onDemoButtonClick('success'); $event.stopPropagation()">
      </magary-button>
    </div>
  </magary-card>`;

  readonly inputRows: CardInputRow[] = [
    { name: 'img', type: 'string', default: 'undefined', descriptionKey: 'components.panel.card.inputs.img.desc' },
    {
      name: 'positionImage',
      type: "'left' | 'right' | 'top' | 'bottom'",
      default: "'top'",
      descriptionKey: 'components.panel.card.inputs.positionImage.desc',
    },
    { name: 'shadow', type: 'number', default: '1', descriptionKey: 'components.panel.card.inputs.shadow.desc' },
    { name: 'width', type: 'string', default: "'250px'", descriptionKey: 'components.panel.card.inputs.width.desc' },
    { name: 'padding', type: 'string', default: "'1rem'", descriptionKey: 'components.panel.card.inputs.padding.desc' },
    { name: 'gap', type: 'string', default: "'1rem'", descriptionKey: 'components.panel.card.inputs.gap.desc' },
    {
      name: 'borderRadius',
      type: 'string',
      default: "'0.75rem'",
      descriptionKey: 'components.panel.card.inputs.borderRadius.desc',
    },
    {
      name: 'imageSize',
      type: 'string',
      default: "'500px'",
      descriptionKey: 'components.panel.card.inputs.imageSize.desc',
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: "'#fff'",
      descriptionKey: 'components.panel.card.inputs.backgroundColor.desc',
    },
    { name: 'height', type: 'string', default: "'auto'", descriptionKey: 'components.panel.card.inputs.height.desc' },
    {
      name: 'responsive',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.panel.card.inputs.responsive.desc',
    },
    {
      name: 'altText',
      type: 'string',
      default: "'Card image'",
      descriptionKey: 'components.panel.card.inputs.altText.desc',
    },
    {
      name: 'imageFit',
      type: "'cover' | 'contain' | 'fill' | 'scale-down' | 'none'",
      default: "'cover'",
      descriptionKey: 'components.panel.card.inputs.imageFit.desc',
    },
    {
      name: 'clickable',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.card.inputs.clickable.desc',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.card.inputs.loading.desc',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      descriptionKey: 'components.panel.card.inputs.disabled.desc',
    },
    {
      name: 'variant',
      type: "'elevated' | 'outlined' | 'filled'",
      default: "'elevated'",
      descriptionKey: 'components.panel.card.inputs.variant.desc',
    },
    {
      name: 'loadingText',
      type: 'string',
      default: "'Cargando...'",
      descriptionKey: 'components.panel.card.inputs.loadingText.desc',
    },
    {
      name: 'hoverEffect',
      type: 'boolean',
      default: 'true',
      descriptionKey: 'components.panel.card.inputs.hoverEffect.desc',
    },
    {
      name: 'border',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.panel.card.inputs.border.desc',
    },
    {
      name: 'badge',
      type: 'string',
      default: 'undefined',
      descriptionKey: 'components.panel.card.inputs.badge.desc',
    },
    {
      name: 'badgeColor',
      type: 'string',
      default: "'var(--primary-500)'",
      descriptionKey: 'components.panel.card.inputs.badgeColor.desc',
    },
  ];

  readonly eventRows: CardEventRow[] = [
    {
      name: 'cardClick',
      type: 'CustomEvent',
      descriptionKey: 'components.panel.card.events.cardClick.desc',
    },
  ];

  onCardClick(_: Event): void {
    try {
      this.lastClickedCard = `${this.t('components.panel.card.status.clickedAt')} ${new Date().toLocaleTimeString()}`;
      this.showToastNotification(this.t('components.panel.card.toast.cardClicked'));
      this.showNotificationIfAllowed();
    } catch {
      this.showToastNotification(this.t('components.panel.card.toast.cardError'), 'error');
    }
  }

  private showToastNotification(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success',
  ): void {
    const titleByType: Record<'success' | 'error' | 'info' | 'warning', string> = {
      success: this.t('components.panel.card.toast.successTitle'),
      error: this.t('components.panel.card.toast.errorTitle'),
      warning: this.t('components.panel.card.toast.warningTitle'),
      info: this.t('components.panel.card.toast.infoTitle'),
    };

    this.toastService.add({
      type,
      title: titleByType[type],
      message,
      duration: 3000,
    });
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  onDemoButtonClick(action: string): void {
    switch (action) {
      case 'success':
        this.showToastNotification(this.t('components.panel.card.toast.actionSuccess'), 'success');
        break;
      case 'error':
        this.showToastNotification(this.t('components.panel.card.toast.actionError'), 'error');
        break;
      case 'info':
        this.showToastNotification(this.t('components.panel.card.toast.actionInfo'), 'info');
        break;
      case 'warning':
        this.showToastNotification(this.t('components.panel.card.toast.actionWarning'), 'warning');
        break;
    }
  }

  private showNotificationIfAllowed(): void {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification(this.t('components.panel.card.notification.title'), {
        body: this.t('components.panel.card.notification.body'),
        icon: '/assets/Magary.png',
        tag: 'magary-card-click',
      });
      return;
    }

    if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.showNotificationIfAllowed();
        }
      });
    }
  }
}