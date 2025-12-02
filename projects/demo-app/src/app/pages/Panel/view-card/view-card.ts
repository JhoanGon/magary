import { Component, inject } from '@angular/core';
import {
  MagaryButton,
  MagaryCard,
  MagaryTab,
  MagaryTabs,
  MagaryToast,
  MagaryToastService,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
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
@Component({
  selector: 'magary-view-card',
  imports: [
    MagaryCard,
    MagaryButton,
    MagaryTabs,
    MagaryTab,
    Highlight,
    MagaryToast,
  ],
  templateUrl: './view-card.html',
  styleUrl: './view-card.scss',
})
export class ViewCard {
  private toastService = inject(MagaryToastService);
  lastClickedCard = '';
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'warning' | 'error' | 'info' = 'success';
  readonly importExample = "import { MagaryCard } from 'ng-magary';";
  readonly exampleBasic = CODE_EXAMPLES.BASIC_CARD;
  readonly exampleImageTop = CODE_EXAMPLES.IMAGE_TOP;
  exampleImageRight = `
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
  exampleAdvanced1 = `
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
      <magary-button label="Acción" severity="secondary"></magary-button>
    </div>
  </magary-card>`;
  exampleAdvanced2 = `
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
      <magary-button label="Ver más" severity="primary"></magary-button>
    </div>
  </magary-card>`;
  exampleStates1 = `
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
      <span style="color: #0066cc;">Haz click aquí</span>
    </div>
  </magary-card>`;
  exampleStates2 = `
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
  exampleVariants = `
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
      <magary-button label="Acción" severity="primary"></magary-button>
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
      <magary-button label="Acción" severity="secondary"></magary-button>
    </div>
  </magary-card>`;
  exampleEvents = `
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
  exampleNotifications = `
  onCardClick(event: Event): void {
    try {
      const customEvent = event as CustomEvent;
      this.showToastNotification('¡Card clickeada exitosamente!');
      this.showToastNotification('Card Interactive: Has clickeado una tarjeta de Magary', 'success');
    } catch (error) {
      console.warn('Error handling card click:', error);
      this.showToastNotification('Error al procesar el click', 'error');
    }
  }`;
  exampleNotificationsTS = `
  private showToastNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'): void {
    this.toastService.add({
      type: type,
      title: type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : type === 'warning' ? 'Alerta' : 'Información',
      message: message,
      duration: 3000,
    });
  }
  onDemoButtonClick(action: string): void {
    switch (action) {
      case 'success':
        this.showToastNotification('¡Acción exitosa!', 'success');
        break;
      case 'error':
        this.showToastNotification('¡Error en la acción!', 'error');
        break;
      case 'info':
        this.showToastNotification('Información importante', 'info');
        break;
      case 'warning':
        this.showToastNotification('Alerta importante', 'warning');
        break;
    }
  }`;
  exampleNotificationsHTML = `
  <!-- Componente Toast en el template -->
  <magary-toast position="top-right"></magary-toast>

  <!-- Uso con MagaryButton dentro de Cards -->
  <magary-card [clickable]="true" (cardClick)="onCardClick($event)">
    <div slot="header">
      <h3>✅ Success Actions</h3>
    </div>
    <p>Estas acciones muestran notificaciones de éxito cuando se completan correctamente.</p>
    <div slot="footer">
      <magary-button
        label="Success Toast"
        severity="success"
        size="small"
        (click)="onDemoButtonClick('success'); $event.stopPropagation()">
      </magary-button>
    </div>
  </magary-card>`;

  onCardClick(event: Event): void {
    try {
      const customEvent = event as CustomEvent;
      console.log('Card clicked!', customEvent.detail);
      this.lastClickedCard = `Card clickeada a las ${new Date().toLocaleTimeString()}`;
      this.showToastNotification('¡Card clickeada exitosamente!');
      this.showNotificationIfAllowed();
    } catch (error) {
      console.warn('Error handling card click:', error);
      this.showToastNotification('Error al procesar el click', 'error');
    }
  }

  private showToastNotification(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success',
  ): void {
    this.toastService.add({
      type: type,
      title:
        type === 'success'
          ? 'Éxito'
          : type === 'error'
            ? 'Error'
            : type === 'warning'
              ? 'Alerta'
              : 'Información',
      message: message,
      duration: 3000,
    });
  }

  closeAlert(): void {
    this.showAlert = false;
  }
  onDemoButtonClick(action: string): void {
    switch (action) {
      case 'success':
        this.showToastNotification('¡Acción exitosa!', 'success');
        break;
      case 'error':
        this.showToastNotification('¡Error en la acción!', 'error');
        break;
      case 'info':
        this.showToastNotification('Información importante', 'info');
        break;
      case 'warning':
        this.showToastNotification('Alerta importante', 'warning');
        break;
    }
  }
  private showNotificationIfAllowed(): void {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      new Notification('Card clickeada!', {
        body: 'Has hecho click en una tarjeta de Magary',
        icon: '/assets/Magary.png',
        tag: 'magary-card-click',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.showNotificationIfAllowed();
        }
      });
    }
  }
}
