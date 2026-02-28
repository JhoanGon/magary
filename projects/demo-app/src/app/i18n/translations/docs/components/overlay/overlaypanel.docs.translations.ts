import { DemoLanguage } from '../../../../types';

export const OVERLAY_PANEL_DOC_TEXT = {
  es: {
    'components.overlay.overlayPanel.title': 'Magary OverlayPanel',
    'components.overlay.overlayPanel.subtitle':
      'Panel flotante posicionado relativo a un elemento objetivo (Popover).',
    'components.overlay.overlayPanel.import.title': 'Importacion',
    'components.overlay.overlayPanel.basic.title': 'Basico',
    'components.overlay.overlayPanel.basic.desc':
      'Haz clic en el boton para mostrar el panel superpuesto.',
    'components.overlay.overlayPanel.basic.button': 'Toggle Overlay',
    'components.overlay.overlayPanel.basic.panelAria': 'Informacion rapida',
    'components.overlay.overlayPanel.basic.contentTitle':
      'Contenido Personalizado',
    'components.overlay.overlayPanel.basic.contentBody':
      'OverlayPanel puede contener cualquier contenido HTML o componentes Angular. Se ajusta automaticamente y se cierra al hacer clic fuera.',
    'components.overlay.overlayPanel.selection.title':
      'Integracion (Seleccion)',
    'components.overlay.overlayPanel.selection.desc':
      'Ejemplo de uso para mostrar detalles de un elemento.',
    'components.overlay.overlayPanel.selection.button1':
      'Ver Imagen (Bamboo Watch)',
    'components.overlay.overlayPanel.selection.button2':
      'Ver Imagen (Black Watch)',
    'components.overlay.overlayPanel.selection.panelAria':
      'Detalle del producto',
    'components.overlay.overlayPanel.selection.currency': 'USD',
    'components.overlay.overlayPanel.selection.eventStatus': 'Estado evento',
    'components.overlay.overlayPanel.basic.codeAria':
      'Codigo de ejemplo basico de overlay',
    'components.overlay.overlayPanel.selection.codeAria':
      'Codigo de ejemplo de seleccion de overlay',
    'components.overlay.overlayPanel.event.none': 'Sin eventos por ahora.',
    'components.overlay.overlayPanel.event.open': 'Overlay abierto',
    'components.overlay.overlayPanel.event.closed': 'Overlay cerrado',
    'components.overlay.overlayPanel.api.title': 'Propiedades (Inputs)',
    'components.overlay.overlayPanel.api.header.name': 'Nombre',
    'components.overlay.overlayPanel.api.header.type': 'Tipo',
    'components.overlay.overlayPanel.api.header.default': 'Por Defecto',
    'components.overlay.overlayPanel.api.header.description': 'Descripcion',
    'components.overlay.overlayPanel.api.dismissable.desc':
      'Si es verdadero, se cierra al hacer clic fuera.',
    'components.overlay.overlayPanel.api.showCloseIcon.desc':
      'Muestra icono para cerrar el panel.',
    'components.overlay.overlayPanel.api.closeOnEscape.desc':
      'Cierra el panel al presionar Escape.',
    'components.overlay.overlayPanel.api.panelAriaLabel.desc':
      'Etiqueta accesible aplicada al contenedor del panel.',
    'components.overlay.overlayPanel.tabs.html': 'HTML',
    'components.overlay.overlayPanel.tabs.ts': 'TypeScript',
  },
  en: {
    'components.overlay.overlayPanel.title': 'Magary OverlayPanel',
    'components.overlay.overlayPanel.subtitle':
      'Floating panel positioned relative to a target element (Popover).',
    'components.overlay.overlayPanel.import.title': 'Import',
    'components.overlay.overlayPanel.basic.title': 'Basic',
    'components.overlay.overlayPanel.basic.desc':
      'Click the button to show the overlay panel.',
    'components.overlay.overlayPanel.basic.button': 'Toggle Overlay',
    'components.overlay.overlayPanel.basic.panelAria': 'Quick information',
    'components.overlay.overlayPanel.basic.contentTitle': 'Custom Content',
    'components.overlay.overlayPanel.basic.contentBody':
      'OverlayPanel can contain any HTML content or Angular components. It auto-adjusts and closes on outside click.',
    'components.overlay.overlayPanel.selection.title':
      'Integration (Selection)',
    'components.overlay.overlayPanel.selection.desc':
      'Usage example to display details for a selected item.',
    'components.overlay.overlayPanel.selection.button1':
      'View Image (Bamboo Watch)',
    'components.overlay.overlayPanel.selection.button2':
      'View Image (Black Watch)',
    'components.overlay.overlayPanel.selection.panelAria': 'Product detail',
    'components.overlay.overlayPanel.selection.currency': 'USD',
    'components.overlay.overlayPanel.selection.eventStatus': 'Event status',
    'components.overlay.overlayPanel.basic.codeAria':
      'Overlay basic example code',
    'components.overlay.overlayPanel.selection.codeAria':
      'Overlay selection example code',
    'components.overlay.overlayPanel.event.none': 'No events for now.',
    'components.overlay.overlayPanel.event.open': 'Overlay opened',
    'components.overlay.overlayPanel.event.closed': 'Overlay closed',
    'components.overlay.overlayPanel.api.title': 'Properties (Inputs)',
    'components.overlay.overlayPanel.api.header.name': 'Name',
    'components.overlay.overlayPanel.api.header.type': 'Type',
    'components.overlay.overlayPanel.api.header.default': 'Default',
    'components.overlay.overlayPanel.api.header.description': 'Description',
    'components.overlay.overlayPanel.api.dismissable.desc':
      'If true, closes on outside click.',
    'components.overlay.overlayPanel.api.showCloseIcon.desc':
      'Displays a close icon for the panel.',
    'components.overlay.overlayPanel.api.closeOnEscape.desc':
      'Closes panel when Escape key is pressed.',
    'components.overlay.overlayPanel.api.panelAriaLabel.desc':
      'Accessible label applied to panel container.',
    'components.overlay.overlayPanel.tabs.html': 'HTML',
    'components.overlay.overlayPanel.tabs.ts': 'TypeScript',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
