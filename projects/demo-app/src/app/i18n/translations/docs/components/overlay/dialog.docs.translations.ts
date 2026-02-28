import { DemoLanguage } from '../../../../types';

export const DIALOG_DOC_TEXT = {
  es: {
    'components.overlay.dialog.title': 'MagaryDialog',
    'components.overlay.dialog.subtitle':
      'Componente de superposicion premium con soporte para glassmorphism, animaciones y control total.',
    'components.overlay.dialog.import.title': 'Import',
    'components.overlay.dialog.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.overlay.dialog.basic.title': 'Ejemplo Basico',
    'components.overlay.dialog.basic.cardTitle': 'Basic Dialog',
    'components.overlay.dialog.basic.button': 'Show Basic Dialog',
    'components.overlay.dialog.basic.header': 'Basic Dialog',
    'components.overlay.dialog.basic.content':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.overlay.dialog.basic.cancel': 'Cancel',
    'components.overlay.dialog.basic.ok': 'Ok',
    'components.overlay.dialog.modal.title': 'Ejemplo Modal',
    'components.overlay.dialog.modal.cardTitle': 'Modal Dialog',
    'components.overlay.dialog.modal.button': 'Show Modal Dialog',
    'components.overlay.dialog.modal.header': 'Modal Dialog',
    'components.overlay.dialog.modal.content':
      'Este es un dialogo modal. El fondo esta bloqueado. No se cierra al hacer clic fuera.',
    'components.overlay.dialog.advanced.title': 'Caracteristicas Avanzadas',
    'components.overlay.dialog.advanced.desc':
      'Ejemplos de arrastre, redimensionamiento y posicionamiento.',
    'components.overlay.dialog.advanced.draggable.title': 'Draggable',
    'components.overlay.dialog.advanced.draggable.button': 'Draggable',
    'components.overlay.dialog.advanced.draggable.header': 'Arrastrame',
    'components.overlay.dialog.advanced.draggable.content':
      'Este dialogo se puede arrastrar desde el encabezado. Nota que [modal]=false permite interactuar con el fondo.',
    'components.overlay.dialog.advanced.resizable.title': 'Resizable',
    'components.overlay.dialog.advanced.resizable.button': 'Resizable',
    'components.overlay.dialog.advanced.resizable.header': 'Redimensioname',
    'components.overlay.dialog.advanced.resizable.content':
      'Este dialogo tiene un manejador en la esquina inferior derecha.',
    'components.overlay.dialog.advanced.position.title': 'Custom Position',
    'components.overlay.dialog.advanced.position.button': 'Right',
    'components.overlay.dialog.advanced.position.header':
      'Posicion Personalizada y Glass',
    'components.overlay.dialog.advanced.position.content':
      'Este dialogo usa position=right y glass=true. Ya no necesitas estilos CSS manuales complejos.',
    'components.overlay.dialog.advanced.glass.title': 'Glass Effect',
    'components.overlay.dialog.advanced.glass.button': 'Glass Effect',
    'components.overlay.dialog.advanced.glass.header': 'Glassmorphism Premium',
    'components.overlay.dialog.advanced.glass.content':
      'Este dialogo utiliza el efecto Glass nativo. Combina desenfoque de fondo con transparencia ajustada.',
    'components.overlay.dialog.advanced.tabs.draggable': 'Draggable',
    'components.overlay.dialog.advanced.tabs.resizable': 'Resizable',
    'components.overlay.dialog.advanced.tabs.positioning': 'Positioning',
    'components.overlay.dialog.advanced.tabs.glass': 'Glass Effect',
    'components.overlay.dialog.container.title': 'Maximizable (Container)',
    'components.overlay.dialog.container.desc':
      'El dialogo se renderiza dentro de este contenedor y se maximiza solo aqui (usando appendTo=local).',
    'components.overlay.dialog.container.cardTitle': 'Container Dialog',
    'components.overlay.dialog.container.button': 'Show Maximizable',
    'components.overlay.dialog.container.header': 'Container Dialog',
    'components.overlay.dialog.container.content':
      'Soy libre, pero solo dentro de este contenedor.',
    'components.overlay.dialog.container.close': 'Close',
    'components.overlay.dialog.container.tabs.html': 'HTML',
    'components.overlay.dialog.container.tabs.ts': 'TypeScript',
    'components.overlay.dialog.api.title': 'Propiedades (Inputs)',
    'components.overlay.dialog.api.desc':
      'Todas las propiedades disponibles del componente.',
    'components.overlay.dialog.api.header.name': 'Nombre',
    'components.overlay.dialog.api.header.type': 'Tipo',
    'components.overlay.dialog.api.header.default': 'Valor por Defecto',
    'components.overlay.dialog.api.header.description': 'Descripcion',
    'components.overlay.dialog.api.header.desc': 'Titulo del dialogo.',
    'components.overlay.dialog.api.visible.desc':
      'Controla la visibilidad. Usa [(visible)] para sincronizar estado al cerrar.',
    'components.overlay.dialog.api.modal.desc':
      'Si es true, muestra mascara que bloquea el fondo.',
    'components.overlay.dialog.api.maximizable.desc':
      'Habilita el boton y funcionalidad de maximizar.',
    'components.overlay.dialog.api.dismissableMask.desc':
      'Si es true, cierra el dialogo al hacer clic fuera.',
    'components.overlay.dialog.api.closeOnEscape.desc':
      'Si es true, permite cerrar con la tecla Escape.',
    'components.overlay.dialog.api.trapFocus.desc':
      'Mantiene el foco de teclado dentro del dialogo mientras esta abierto.',
    'components.overlay.dialog.api.autoFocus.desc':
      'Enfoca automaticamente el primer elemento interactivo al abrir.',
    'components.overlay.dialog.api.ariaLabel.desc':
      'Nombre accesible para lectores de pantalla cuando no se define header.',
    'components.overlay.dialog.api.draggable.desc':
      'Habilita el arrastre del dialogo desde el encabezado.',
    'components.overlay.dialog.api.resizable.desc':
      'Habilita el redimensionamiento del dialogo.',
    'components.overlay.dialog.api.appendTo.desc':
      'Define donde se adjunta el dialogo. local lo restringe a contenedor relativo.',
    'components.overlay.dialog.api.position.desc':
      'Posicion del dialogo: center, top, bottom, left, right y esquinas.',
    'components.overlay.dialog.api.width.desc':
      'Ancho del dialogo (ej. 50vw, 300px).',
    'components.overlay.dialog.api.height.desc':
      'Alto del dialogo (ej. 50vh, auto).',
    'components.overlay.dialog.api.backgroundColor.desc':
      'Color de fondo personalizado del dialogo.',
    'components.overlay.dialog.api.headerBackground.desc':
      'Color de fondo del encabezado.',
    'components.overlay.dialog.api.contentBackground.desc':
      'Color de fondo del contenido.',
    'components.overlay.dialog.api.footerBackground.desc':
      'Color de fondo del footer.',
    'components.overlay.dialog.api.showBorder.desc':
      'Muestra u oculta el borde externo del dialogo.',
    'components.overlay.dialog.api.showSectionBorders.desc':
      'Muestra u oculta lineas separadoras entre header, content y footer.',
    'components.overlay.dialog.api.glass.desc':
      'Aplica efecto glassmorphism (desenfoque y transparencia) al dialogo.',
    'components.overlay.dialog.tabs.html': 'HTML',
  },
  en: {
    'components.overlay.dialog.title': 'MagaryDialog',
    'components.overlay.dialog.subtitle':
      'Premium overlay component with support for glassmorphism, animations, and full control.',
    'components.overlay.dialog.import.title': 'Import',
    'components.overlay.dialog.import.desc':
      'Import the component in your module or standalone component.',
    'components.overlay.dialog.basic.title': 'Basic Example',
    'components.overlay.dialog.basic.cardTitle': 'Basic Dialog',
    'components.overlay.dialog.basic.button': 'Show Basic Dialog',
    'components.overlay.dialog.basic.header': 'Basic Dialog',
    'components.overlay.dialog.basic.content':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'components.overlay.dialog.basic.cancel': 'Cancel',
    'components.overlay.dialog.basic.ok': 'Ok',
    'components.overlay.dialog.modal.title': 'Modal Example',
    'components.overlay.dialog.modal.cardTitle': 'Modal Dialog',
    'components.overlay.dialog.modal.button': 'Show Modal Dialog',
    'components.overlay.dialog.modal.header': 'Modal Dialog',
    'components.overlay.dialog.modal.content':
      'This is a modal dialog. The background is blocked. It does not close on outside click.',
    'components.overlay.dialog.advanced.title': 'Advanced Features',
    'components.overlay.dialog.advanced.desc':
      'Examples of drag, resize, and positioning.',
    'components.overlay.dialog.advanced.draggable.title': 'Draggable',
    'components.overlay.dialog.advanced.draggable.button': 'Draggable',
    'components.overlay.dialog.advanced.draggable.header': 'Drag me',
    'components.overlay.dialog.advanced.draggable.content':
      'This dialog can be dragged from the header. Note that [modal]=false allows interaction with background.',
    'components.overlay.dialog.advanced.resizable.title': 'Resizable',
    'components.overlay.dialog.advanced.resizable.button': 'Resizable',
    'components.overlay.dialog.advanced.resizable.header': 'Resize me',
    'components.overlay.dialog.advanced.resizable.content':
      'This dialog has a resize handle in the bottom-right corner.',
    'components.overlay.dialog.advanced.position.title': 'Custom Position',
    'components.overlay.dialog.advanced.position.button': 'Right',
    'components.overlay.dialog.advanced.position.header':
      'Custom Position and Glass',
    'components.overlay.dialog.advanced.position.content':
      'This dialog uses position=right and glass=true. No complex manual CSS needed.',
    'components.overlay.dialog.advanced.glass.title': 'Glass Effect',
    'components.overlay.dialog.advanced.glass.button': 'Glass Effect',
    'components.overlay.dialog.advanced.glass.header': 'Glassmorphism Premium',
    'components.overlay.dialog.advanced.glass.content':
      'This dialog uses native Glass effect. It combines backdrop blur with tuned transparency.',
    'components.overlay.dialog.advanced.tabs.draggable': 'Draggable',
    'components.overlay.dialog.advanced.tabs.resizable': 'Resizable',
    'components.overlay.dialog.advanced.tabs.positioning': 'Positioning',
    'components.overlay.dialog.advanced.tabs.glass': 'Glass Effect',
    'components.overlay.dialog.container.title': 'Maximizable (Container)',
    'components.overlay.dialog.container.desc':
      'Dialog is rendered inside this container and maximizes only here (using appendTo=local).',
    'components.overlay.dialog.container.cardTitle': 'Container Dialog',
    'components.overlay.dialog.container.button': 'Show Maximizable',
    'components.overlay.dialog.container.header': 'Container Dialog',
    'components.overlay.dialog.container.content':
      'I am free, but only inside this container.',
    'components.overlay.dialog.container.close': 'Close',
    'components.overlay.dialog.container.tabs.html': 'HTML',
    'components.overlay.dialog.container.tabs.ts': 'TypeScript',
    'components.overlay.dialog.api.title': 'Properties (Inputs)',
    'components.overlay.dialog.api.desc':
      'All available component properties.',
    'components.overlay.dialog.api.header.name': 'Name',
    'components.overlay.dialog.api.header.type': 'Type',
    'components.overlay.dialog.api.header.default': 'Default',
    'components.overlay.dialog.api.header.description': 'Description',
    'components.overlay.dialog.api.header.desc': 'Dialog title.',
    'components.overlay.dialog.api.visible.desc':
      'Controls visibility. Use [(visible)] to keep state in sync after close.',
    'components.overlay.dialog.api.modal.desc':
      'If true, displays a mask that blocks background.',
    'components.overlay.dialog.api.maximizable.desc':
      'Enables maximize button and behavior.',
    'components.overlay.dialog.api.dismissableMask.desc':
      'If true, closes the dialog on outside click.',
    'components.overlay.dialog.api.closeOnEscape.desc':
      'If true, allows closing with Escape key.',
    'components.overlay.dialog.api.trapFocus.desc':
      'Keeps keyboard focus inside dialog while open.',
    'components.overlay.dialog.api.autoFocus.desc':
      'Automatically focuses the first interactive element on open.',
    'components.overlay.dialog.api.ariaLabel.desc':
      'Accessible name for screen readers when header is not provided.',
    'components.overlay.dialog.api.draggable.desc':
      'Enables dragging from dialog header.',
    'components.overlay.dialog.api.resizable.desc':
      'Enables dialog resizing.',
    'components.overlay.dialog.api.appendTo.desc':
      'Defines where dialog is attached. local restricts it to relative container.',
    'components.overlay.dialog.api.position.desc':
      'Dialog position: center, top, bottom, left, right, and corners.',
    'components.overlay.dialog.api.width.desc':
      'Dialog width (e.g. 50vw, 300px).',
    'components.overlay.dialog.api.height.desc':
      'Dialog height (e.g. 50vh, auto).',
    'components.overlay.dialog.api.backgroundColor.desc':
      'Custom dialog background color.',
    'components.overlay.dialog.api.headerBackground.desc':
      'Header background color.',
    'components.overlay.dialog.api.contentBackground.desc':
      'Content background color.',
    'components.overlay.dialog.api.footerBackground.desc':
      'Footer background color.',
    'components.overlay.dialog.api.showBorder.desc':
      'Shows or hides outer dialog border.',
    'components.overlay.dialog.api.showSectionBorders.desc':
      'Shows or hides separators between header, content, and footer.',
    'components.overlay.dialog.api.glass.desc':
      'Applies glassmorphism effect (blur and transparency) to dialog.',
    'components.overlay.dialog.tabs.html': 'HTML',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
