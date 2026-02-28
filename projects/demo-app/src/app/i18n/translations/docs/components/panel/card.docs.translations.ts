import { DemoLanguage } from '../../../../types';

export const CARD_DOC_TEXT = {
  es: {
    'components.panel.card.title': 'MagaryCard',
    'components.panel.card.import.title': 'Import',
    'components.panel.card.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.panel.card.basic.title': 'Ejemplo basico',
    'components.panel.card.basic.variant': 'Default',
    'components.panel.card.basic.header': 'Basic Card',
    'components.panel.card.basic.body':
      'A simple card with a clean layout, perfect for displaying content in a structured way.',
    'components.panel.card.basic.button': 'Explore',
    'components.panel.card.image.title': 'Ejemplo con imagen',
    'components.panel.card.image.topVariant': 'Imagen Arriba',
    'components.panel.card.image.topHeader': 'Artistic Vision',
    'components.panel.card.image.topBody':
      'Discover the beauty of abstract art and how it influences modern design trends.',
    'components.panel.card.image.topButton': 'View Gallery',
    'components.panel.card.image.rightVariant': 'Imagen a la derecha',
    'components.panel.card.image.rightHeader': 'Team Collaboration',
    'components.panel.card.image.rightBody':
      'Boost productivity with our new collaboration tools designed for remote teams.',
    'components.panel.card.image.rightButton': 'Learn More',
    'components.panel.card.premium.title': 'Premium Product Card',
    'components.panel.card.premium.desc':
      'Ejemplo de una tarjeta de producto con estilo premium y hover effects.',
    'components.panel.card.premium.variant': 'Product Card',
    'components.panel.card.premium.header': 'Headphones Pro',
    'components.panel.card.premium.body':
      'Experience premium sound quality with our latest noise-cancelling technology.',
    'components.panel.card.premium.buttonPrimary': 'Add to Cart',
    'components.panel.card.advanced.title': 'Ejemplos Avanzados',
    'components.panel.card.advanced.fixedVariant': 'Con altura fija',
    'components.panel.card.advanced.fixedHeader': 'Fixed Height',
    'components.panel.card.advanced.fixedBody':
      'This card maintains a fixed height of 300px regardless of content, useful for grid layouts.',
    'components.panel.card.advanced.fixedButton': 'Action',
    'components.panel.card.advanced.containVariant': 'ImageFit: contain',
    'components.panel.card.advanced.containHeader': 'Full Contain',
    'components.panel.card.advanced.containBody':
      'The image fits perfectly within the container without cropping.',
    'components.panel.card.advanced.containButton': 'View Details',
    'components.panel.card.states.title': 'Estados y Variantes',
    'components.panel.card.states.desc':
      'Explora las diferentes interacciones y estilos visuales disponibles.',
    'components.panel.card.states.interactiveGroup': 'Estados Interactivos',
    'components.panel.card.states.interactiveHeader': 'Clickable',
    'components.panel.card.states.interactiveBody':
      'Tarjeta interactiva que responde a eventos de click y teclado. Ideal para navegacion.',
    'components.panel.card.states.interactiveAction':
      'Probar interaccion ->',
    'components.panel.card.states.interactiveLabel': 'Interactive',
    'components.panel.card.states.interactiveLabelDesc':
      'Soporte completo para eventos',
    'components.panel.card.states.loadingHeader': 'Loading State',
    'components.panel.card.states.loadingBody':
      'El contenido se oculta automaticamente bajo una capa de carga elegante.',
    'components.panel.card.states.loadingButton': 'Wait',
    'components.panel.card.states.loadingLabel': 'Loading',
    'components.panel.card.states.loadingLabelDesc':
      'Overlay de carga integrado',
    'components.panel.card.states.disabledHeader': 'Disabled',
    'components.panel.card.states.disabledBody':
      'Estado visual para contenido no disponible o restringido.',
    'components.panel.card.states.disabledButton': 'Locked',
    'components.panel.card.states.disabledLabel': 'Disabled',
    'components.panel.card.states.disabledLabelDesc':
      'Indicador visual de estado inactivo',
    'components.panel.card.states.visualGroup': 'Variantes Visuales',
    'components.panel.card.states.outlinedHeader': 'Outlined',
    'components.panel.card.states.outlinedBody':
      'Diseno limpio con borde sutil, perfecto para contenido secundario o agrupaciones.',
    'components.panel.card.states.outlinedButton': 'Ver detalles',
    'components.panel.card.states.outlinedLabel': 'Outlined',
    'components.panel.card.states.outlinedLabelDesc': 'Borde sutil sin sombra',
    'components.panel.card.states.filledHeader': 'Filled',
    'components.panel.card.states.filledBody':
      'Fondo solido sutil que destaca sin elevarse de la superficie.',
    'components.panel.card.states.filledButton': 'Accion',
    'components.panel.card.states.filledLabel': 'Filled',
    'components.panel.card.states.filledLabelDesc': 'Fondo solido plano',
    'components.panel.card.states.elevatedHeader': 'Elevated',
    'components.panel.card.states.elevatedBody':
      'Alta elevacion para contenido destacado o modal.',
    'components.panel.card.states.elevatedButton': 'Destacado',
    'components.panel.card.states.elevatedLabel': 'High Elevation',
    'components.panel.card.states.elevatedLabelDesc': 'Sombra profunda (Shadow 4)',
    'components.panel.card.notifications.title':
      'Demo: Integracion con Notificaciones',
    'components.panel.card.notifications.desc':
      'Cards interactivas con notificaciones integradas',
    'components.panel.card.notifications.successTitle':
      'Notificaciones de Exito',
    'components.panel.card.notifications.successHeader': 'Success Actions',
    'components.panel.card.notifications.successBody':
      'These actions trigger success notifications when completed successfully.',
    'components.panel.card.notifications.successButton': 'Success Toast',
    'components.panel.card.notifications.errorTitle':
      'Notificaciones de Error',
    'components.panel.card.notifications.errorHeader': 'Error Actions',
    'components.panel.card.notifications.errorBody':
      'These actions might fail and will display appropriate error notifications.',
    'components.panel.card.notifications.errorButton': 'Error Toast',
    'components.panel.card.notifications.infoTitle': 'Informacion y Alertas',
    'components.panel.card.notifications.infoHeader': 'Info & Alerts',
    'components.panel.card.notifications.infoBody':
      'Important information and system alerts for the user.',
    'components.panel.card.notifications.infoButton': 'Info Toast',
    'components.panel.card.notifications.warningButton': 'Alert',
    'components.panel.card.inputs.title': 'Propiedades (Inputs)',
    'components.panel.card.inputs.desc':
      'Todas las propiedades disponibles del componente',
    'components.panel.card.events.title': 'Eventos',
    'components.panel.card.events.desc': 'Eventos que emite el componente',
    'components.panel.card.events.example': 'Ejemplo de uso de eventos:',
    'components.panel.card.slots.title': 'Slots (Contenido)',
    'components.panel.card.slots.desc':
      'Contenido personalizable dentro del componente',
    'components.panel.card.slots.header': 'Area del encabezado',
    'components.panel.card.slots.footer': 'Area del pie de pagina',
    'components.panel.card.slots.free': 'Contenido libre entre ambos slots',
    'components.panel.card.a11y.title': 'Accesibilidad',
    'components.panel.card.a11y.desc':
      'Caracteristicas de accesibilidad implementadas',
    'components.panel.card.a11y.semantic':
      'Semantica: Estructura clara con imagen y contenido.',
    'components.panel.card.a11y.responsive':
      'Responsive: Imagen y contenido se adaptan a su posicion.',
    'components.panel.card.a11y.contrast':
      'Contraste: Personalizable con backgroundColor.',
    'components.panel.card.a11y.image':
      'Imagen: Incluye atributo alt accesible.',
    'components.panel.card.a11y.badge':
      'Badge: Elemento visual para estados o etiquetas.',
    'components.panel.card.table.header.name': 'Nombre',
    'components.panel.card.table.header.type': 'Tipo',
    'components.panel.card.table.header.default': 'Valor por Defecto',
    'components.panel.card.table.header.description': 'Descripcion',
    'components.panel.card.events.table.description': 'Descripcion',
    'components.panel.card.inputs.img.desc': 'URL de la imagen a mostrar.',
    'components.panel.card.inputs.positionImage.desc':
      'Posicion de la imagen respecto al contenido.',
    'components.panel.card.inputs.shadow.desc':
      'Nivel de sombra aplicado (0-5).',
    'components.panel.card.inputs.width.desc': 'Ancho de la tarjeta.',
    'components.panel.card.inputs.padding.desc':
      'Espaciado interno de la tarjeta.',
    'components.panel.card.inputs.gap.desc':
      'Espacio entre elementos internos.',
    'components.panel.card.inputs.borderRadius.desc':
      'Radio del borde de la tarjeta.',
    'components.panel.card.inputs.imageSize.desc':
      'Altura maxima de la imagen (para top/bottom).',
    'components.panel.card.inputs.backgroundColor.desc':
      'Color de fondo de la tarjeta.',
    'components.panel.card.inputs.height.desc': 'Altura de la tarjeta.',
    'components.panel.card.inputs.responsive.desc':
      'Habilita el comportamiento responsive.',
    'components.panel.card.inputs.altText.desc':
      'Texto alternativo para la imagen (accesibilidad).',
    'components.panel.card.inputs.imageFit.desc':
      'Modo de ajuste de la imagen.',
    'components.panel.card.inputs.clickable.desc':
      'Hace la tarjeta clickeable.',
    'components.panel.card.inputs.loading.desc':
      'Muestra estado de carga.',
    'components.panel.card.inputs.disabled.desc':
      'Deshabilita la tarjeta.',
    'components.panel.card.inputs.variant.desc':
      'Variante visual de la tarjeta.',
    'components.panel.card.inputs.loadingText.desc':
      'Texto mostrado durante la carga.',
    'components.panel.card.inputs.hoverEffect.desc':
      'Habilita el efecto de elevacion al pasar el mouse.',
    'components.panel.card.inputs.border.desc':
      "Estilo CSS completo del borde (ej: '1px solid red').",
    'components.panel.card.inputs.badge.desc':
      'Texto del badge mostrado en la esquina superior derecha.',
    'components.panel.card.inputs.badgeColor.desc':
      'Color de fondo del badge.',
    'components.panel.card.events.cardClick.desc':
      'Se emite cuando se hace click en una tarjeta clickeable.',
    'components.panel.card.tabs.imageTop': 'Imagen Arriba',
    'components.panel.card.tabs.imageRight': 'Imagen a la Derecha',
    'components.panel.card.tabs.fixedHeight': 'Altura Fija',
    'components.panel.card.tabs.imageContain': 'Imagen Contain',
    'components.panel.card.tabs.clickable': 'Clickeable',
    'components.panel.card.tabs.loading': 'Loading',
    'components.panel.card.tabs.variants': 'Variantes',
    'components.panel.card.tabs.html': 'HTML',
    'components.panel.card.tabs.ts': 'TypeScript',
    'components.panel.card.tabs.events': 'Eventos',
    'components.panel.card.toast.successTitle': 'Exito',
    'components.panel.card.toast.errorTitle': 'Error',
    'components.panel.card.toast.warningTitle': 'Alerta',
    'components.panel.card.toast.infoTitle': 'Informacion',
    'components.panel.card.toast.cardClicked': 'Card clickeada exitosamente!',
    'components.panel.card.toast.cardError': 'Error al procesar el click',
    'components.panel.card.toast.actionSuccess': 'Accion exitosa!',
    'components.panel.card.toast.actionError': 'Error en la accion!',
    'components.panel.card.toast.actionInfo': 'Informacion importante',
    'components.panel.card.toast.actionWarning': 'Alerta importante',
    'components.panel.card.status.clickedAt': 'Card clickeada a las',
    'components.panel.card.notification.title': 'Card clickeada!',
    'components.panel.card.notification.body':
      'Has hecho click en una tarjeta de Magary',
  },
  en: {
    'components.panel.card.title': 'MagaryCard',
    'components.panel.card.import.title': 'Import',
    'components.panel.card.import.desc':
      'Import the component in your module or standalone component.',
    'components.panel.card.basic.title': 'Basic Example',
    'components.panel.card.basic.variant': 'Default',
    'components.panel.card.basic.header': 'Basic Card',
    'components.panel.card.basic.body':
      'A simple card with a clean layout, perfect for displaying content in a structured way.',
    'components.panel.card.basic.button': 'Explore',
    'components.panel.card.image.title': 'Image Example',
    'components.panel.card.image.topVariant': 'Image Top',
    'components.panel.card.image.topHeader': 'Artistic Vision',
    'components.panel.card.image.topBody':
      'Discover the beauty of abstract art and how it influences modern design trends.',
    'components.panel.card.image.topButton': 'View Gallery',
    'components.panel.card.image.rightVariant': 'Image Right',
    'components.panel.card.image.rightHeader': 'Team Collaboration',
    'components.panel.card.image.rightBody':
      'Boost productivity with our new collaboration tools designed for remote teams.',
    'components.panel.card.image.rightButton': 'Learn More',
    'components.panel.card.premium.title': 'Premium Product Card',
    'components.panel.card.premium.desc':
      'Product card example with premium style and hover effects.',
    'components.panel.card.premium.variant': 'Product Card',
    'components.panel.card.premium.header': 'Headphones Pro',
    'components.panel.card.premium.body':
      'Experience premium sound quality with our latest noise-cancelling technology.',
    'components.panel.card.premium.buttonPrimary': 'Add to Cart',
    'components.panel.card.advanced.title': 'Advanced Examples',
    'components.panel.card.advanced.fixedVariant': 'Fixed height',
    'components.panel.card.advanced.fixedHeader': 'Fixed Height',
    'components.panel.card.advanced.fixedBody':
      'This card maintains a fixed height of 300px regardless of content, useful for grid layouts.',
    'components.panel.card.advanced.fixedButton': 'Action',
    'components.panel.card.advanced.containVariant': 'ImageFit: contain',
    'components.panel.card.advanced.containHeader': 'Full Contain',
    'components.panel.card.advanced.containBody':
      'The image fits perfectly within the container without cropping.',
    'components.panel.card.advanced.containButton': 'View Details',
    'components.panel.card.states.title': 'States and Variants',
    'components.panel.card.states.desc':
      'Explore available interactions and visual styles.',
    'components.panel.card.states.interactiveGroup': 'Interactive States',
    'components.panel.card.states.interactiveHeader': 'Clickable',
    'components.panel.card.states.interactiveBody':
      'Interactive card that responds to click and keyboard events. Ideal for navigation.',
    'components.panel.card.states.interactiveAction': 'Try interaction ->',
    'components.panel.card.states.interactiveLabel': 'Interactive',
    'components.panel.card.states.interactiveLabelDesc':
      'Complete event support',
    'components.panel.card.states.loadingHeader': 'Loading State',
    'components.panel.card.states.loadingBody':
      'Content is automatically hidden under an elegant loading layer.',
    'components.panel.card.states.loadingButton': 'Wait',
    'components.panel.card.states.loadingLabel': 'Loading',
    'components.panel.card.states.loadingLabelDesc':
      'Built-in loading overlay',
    'components.panel.card.states.disabledHeader': 'Disabled',
    'components.panel.card.states.disabledBody':
      'Visual state for unavailable or restricted content.',
    'components.panel.card.states.disabledButton': 'Locked',
    'components.panel.card.states.disabledLabel': 'Disabled',
    'components.panel.card.states.disabledLabelDesc':
      'Visual indicator for inactive state',
    'components.panel.card.states.visualGroup': 'Visual Variants',
    'components.panel.card.states.outlinedHeader': 'Outlined',
    'components.panel.card.states.outlinedBody':
      'Clean design with subtle border, perfect for secondary content and grouping.',
    'components.panel.card.states.outlinedButton': 'View details',
    'components.panel.card.states.outlinedLabel': 'Outlined',
    'components.panel.card.states.outlinedLabelDesc': 'Subtle border without shadow',
    'components.panel.card.states.filledHeader': 'Filled',
    'components.panel.card.states.filledBody':
      'Subtle solid background that stands out without elevation.',
    'components.panel.card.states.filledButton': 'Action',
    'components.panel.card.states.filledLabel': 'Filled',
    'components.panel.card.states.filledLabelDesc': 'Flat solid background',
    'components.panel.card.states.elevatedHeader': 'Elevated',
    'components.panel.card.states.elevatedBody':
      'High elevation for featured or modal-like content.',
    'components.panel.card.states.elevatedButton': 'Featured',
    'components.panel.card.states.elevatedLabel': 'High Elevation',
    'components.panel.card.states.elevatedLabelDesc': 'Deep shadow (Shadow 4)',
    'components.panel.card.notifications.title':
      'Demo: Notifications Integration',
    'components.panel.card.notifications.desc':
      'Interactive cards with integrated notifications',
    'components.panel.card.notifications.successTitle': 'Success Notifications',
    'components.panel.card.notifications.successHeader': 'Success Actions',
    'components.panel.card.notifications.successBody':
      'These actions trigger success notifications when completed successfully.',
    'components.panel.card.notifications.successButton': 'Success Toast',
    'components.panel.card.notifications.errorTitle': 'Error Notifications',
    'components.panel.card.notifications.errorHeader': 'Error Actions',
    'components.panel.card.notifications.errorBody':
      'These actions might fail and will display appropriate error notifications.',
    'components.panel.card.notifications.errorButton': 'Error Toast',
    'components.panel.card.notifications.infoTitle': 'Info and Alerts',
    'components.panel.card.notifications.infoHeader': 'Info & Alerts',
    'components.panel.card.notifications.infoBody':
      'Important information and system alerts for the user.',
    'components.panel.card.notifications.infoButton': 'Info Toast',
    'components.panel.card.notifications.warningButton': 'Alert',
    'components.panel.card.inputs.title': 'Properties (Inputs)',
    'components.panel.card.inputs.desc':
      'All available component properties',
    'components.panel.card.events.title': 'Events',
    'components.panel.card.events.desc': 'Events emitted by the component',
    'components.panel.card.events.example': 'Event usage example:',
    'components.panel.card.slots.title': 'Slots (Content)',
    'components.panel.card.slots.desc': 'Customizable content inside component',
    'components.panel.card.slots.header': 'Header area',
    'components.panel.card.slots.footer': 'Footer area',
    'components.panel.card.slots.free': 'Free content between both slots',
    'components.panel.card.a11y.title': 'Accessibility',
    'components.panel.card.a11y.desc':
      'Implemented accessibility features',
    'components.panel.card.a11y.semantic':
      'Semantics: Clear structure with image and content.',
    'components.panel.card.a11y.responsive':
      'Responsive: Image and content adapt to their position.',
    'components.panel.card.a11y.contrast':
      'Contrast: Customizable with backgroundColor.',
    'components.panel.card.a11y.image':
      'Image: Includes accessible alt attribute.',
    'components.panel.card.a11y.badge':
      'Badge: Visual element for states or tags.',
    'components.panel.card.table.header.name': 'Name',
    'components.panel.card.table.header.type': 'Type',
    'components.panel.card.table.header.default': 'Default',
    'components.panel.card.table.header.description': 'Description',
    'components.panel.card.events.table.description': 'Description',
    'components.panel.card.inputs.img.desc': 'Image URL to display.',
    'components.panel.card.inputs.positionImage.desc':
      'Image position relative to content.',
    'components.panel.card.inputs.shadow.desc':
      'Applied shadow level (0-5).',
    'components.panel.card.inputs.width.desc': 'Card width.',
    'components.panel.card.inputs.padding.desc': 'Internal card spacing.',
    'components.panel.card.inputs.gap.desc': 'Spacing between internal elements.',
    'components.panel.card.inputs.borderRadius.desc': 'Card border radius.',
    'components.panel.card.inputs.imageSize.desc':
      'Maximum image height (for top/bottom).',
    'components.panel.card.inputs.backgroundColor.desc':
      'Card background color.',
    'components.panel.card.inputs.height.desc': 'Card height.',
    'components.panel.card.inputs.responsive.desc':
      'Enables responsive behavior.',
    'components.panel.card.inputs.altText.desc':
      'Alternative text for image (accessibility).',
    'components.panel.card.inputs.imageFit.desc': 'Image fit mode.',
    'components.panel.card.inputs.clickable.desc': 'Makes card clickable.',
    'components.panel.card.inputs.loading.desc': 'Shows loading state.',
    'components.panel.card.inputs.disabled.desc': 'Disables card.',
    'components.panel.card.inputs.variant.desc': 'Card visual variant.',
    'components.panel.card.inputs.loadingText.desc':
      'Text shown during loading.',
    'components.panel.card.inputs.hoverEffect.desc':
      'Enables elevation hover effect.',
    'components.panel.card.inputs.border.desc':
      "Full CSS border style (e.g. '1px solid red').",
    'components.panel.card.inputs.badge.desc':
      'Badge text displayed at top-right corner.',
    'components.panel.card.inputs.badgeColor.desc': 'Badge background color.',
    'components.panel.card.events.cardClick.desc':
      'Emitted when clicking a clickable card.',
    'components.panel.card.tabs.imageTop': 'Image Top',
    'components.panel.card.tabs.imageRight': 'Image Right',
    'components.panel.card.tabs.fixedHeight': 'Fixed Height',
    'components.panel.card.tabs.imageContain': 'Image Contain',
    'components.panel.card.tabs.clickable': 'Clickable',
    'components.panel.card.tabs.loading': 'Loading',
    'components.panel.card.tabs.variants': 'Variants',
    'components.panel.card.tabs.html': 'HTML',
    'components.panel.card.tabs.ts': 'TypeScript',
    'components.panel.card.tabs.events': 'Events',
    'components.panel.card.toast.successTitle': 'Success',
    'components.panel.card.toast.errorTitle': 'Error',
    'components.panel.card.toast.warningTitle': 'Warning',
    'components.panel.card.toast.infoTitle': 'Information',
    'components.panel.card.toast.cardClicked': 'Card clicked successfully!',
    'components.panel.card.toast.cardError': 'Error processing click',
    'components.panel.card.toast.actionSuccess': 'Successful action!',
    'components.panel.card.toast.actionError': 'Action error!',
    'components.panel.card.toast.actionInfo': 'Important information',
    'components.panel.card.toast.actionWarning': 'Important alert',
    'components.panel.card.status.clickedAt': 'Card clicked at',
    'components.panel.card.notification.title': 'Card clicked!',
    'components.panel.card.notification.body':
      'You clicked a Magary card',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
