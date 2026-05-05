import { DemoLanguage } from '../../../../types';

export const PANEL_MENU_DOC_TEXT = {
  es: {
    'components.menu.panelMenu.title': 'Magary PanelMenu',
    'components.menu.panelMenu.subtitle':
      'Componente de menu lateral desplegable y personalizable.',
    'components.menu.panelMenu.import.title': 'Import',
    'components.menu.panelMenu.import.desc':
      'Importa el componente en tu componente standalone.',
    'components.menu.panelMenu.advanced.title': 'Ejemplo mejorado con eventos',
    'components.menu.panelMenu.advanced.desc':
      'Panel menu con funcionalidades avanzadas y manejo de eventos.',
    'components.menu.panelMenu.layouts.title': 'Variantes de layout',
    'components.menu.panelMenu.layouts.desc':
      'El componente soporta modos accordion, list, rail y grid para distintos contextos de navegacion.',
    'components.menu.panelMenu.layouts.accordion': 'Accordion',
    'components.menu.panelMenu.layouts.list': 'List',
    'components.menu.panelMenu.layouts.rail': 'Rail Icons',
    'components.menu.panelMenu.layouts.grid': 'Grid',
    'components.menu.panelMenu.tabs.html': 'HTML',
    'components.menu.panelMenu.tabs.typescript': 'TypeScript',
    'components.menu.panelMenu.tabs.events': 'Eventos',
    'components.menu.panelMenu.apiInputs.title': 'Propiedades (Inputs)',
    'components.menu.panelMenu.apiInputs.desc':
      'Estas son las entradas que puedes configurar en el componente.',
    'components.menu.panelMenu.apiInputs.header.name': 'Nombre',
    'components.menu.panelMenu.apiInputs.header.type': 'Tipo',
    'components.menu.panelMenu.apiInputs.header.default': 'Valor por Defecto',
    'components.menu.panelMenu.apiInputs.header.description': 'Descripcion',
    'components.menu.panelMenu.apiInputs.title.desc':
      'Titulo del panel que se muestra en el header.',
    'components.menu.panelMenu.apiInputs.items.desc':
      'Lista de elementos que componen el menu.',
    'components.menu.panelMenu.apiInputs.icon.desc':
      'Icono del header principal del panel.',
    'components.menu.panelMenu.apiInputs.iconClass.desc':
      'Clase CSS adicional para el icono del header.',
    'components.menu.panelMenu.apiInputs.style.desc':
      'Estilos inline para el contenedor del panel.',
    'components.menu.panelMenu.apiInputs.styleClass.desc':
      'Clase CSS adicional para el contenedor del panel.',
    'components.menu.panelMenu.apiInputs.backgroundColor.desc':
      'Color de fondo del panel.',
    'components.menu.panelMenu.apiInputs.textColor.desc': 'Color del texto.',
    'components.menu.panelMenu.apiInputs.hoverColor.desc':
      'Color de fondo al pasar el mouse sobre un item.',
    'components.menu.panelMenu.apiInputs.borderRadius.desc':
      'Radio del borde del panel.',
    'components.menu.panelMenu.apiInputs.shadow.desc':
      'Nivel de sombra del panel.',
    'components.menu.panelMenu.apiInputs.width.desc': 'Ancho del panel.',
    'components.menu.panelMenu.apiInputs.allowMultipleExpanded.desc':
      'Permite multiples items expandidos al mismo tiempo.',
    'components.menu.panelMenu.apiInputs.defaultOpen.desc':
      'Si el panel debe estar abierto por defecto.',
    'components.menu.panelMenu.apiInputs.collapsed.desc':
      'Indica si el panel esta en modo colapsado (usado por Sidebar).',
    'components.menu.panelMenu.apiInputs.mode.desc':
      'Modo visual del menu: accordion, list, rail-icons, rail-labeled o grid.',
    'components.menu.panelMenu.apiInputs.showHeader.desc':
      'Muestra u oculta el header del panel.',
    'components.menu.panelMenu.apiInputs.showItemLabels.desc':
      'Muestra u oculta el texto de los items en modos compactos.',
    'components.menu.panelMenu.apiInputs.gridColumns.desc':
      'Numero de columnas cuando mode="grid".',
    'components.menu.panelMenu.apiInputs.activeIndicator.desc':
      'Activa el indicador visual del item marcado como activo.',
    'components.menu.panelMenu.apiInputs.navigationLabel.desc':
      'Etiqueta aria del landmark de navegacion del panel.',
    'components.menu.panelMenu.apiOutputs.title': 'Eventos (Outputs)',
    'components.menu.panelMenu.apiOutputs.desc':
      'Eventos que emite el componente.',
    'components.menu.panelMenu.apiOutputs.header.name': 'Nombre',
    'components.menu.panelMenu.apiOutputs.header.type': 'Tipo',
    'components.menu.panelMenu.apiOutputs.header.description': 'Descripcion',
    'components.menu.panelMenu.apiOutputs.menuToggle.desc':
      'Se emite cuando el panel se abre o se cierra.',
    'components.menu.panelMenu.apiOutputs.itemClick.desc':
      'Se emite cuando se hace click en un item del menu.',
    'components.menu.panelMenu.apiOutputs.itemExpand.desc':
      'Se emite cuando un item se expande o contrae.',
    'components.menu.panelMenu.apiOutputs.expandSidebar.desc':
      'Se emite en modo colapsado para solicitar expansion del sidebar padre.',
    'components.menu.panelMenu.structure.title': 'Estructura esperada',
    'components.menu.panelMenu.structure.item1':
      'items debe ser un arreglo de objetos MenuItem.',
    'components.menu.panelMenu.structure.item2':
      'Cada MenuItem puede tener children de forma recursiva.',
    'components.menu.panelMenu.structure.item3':
      'Cada item puede tener label, route, url, target, command e icon.',
    'components.menu.panelMenu.a11y.title': 'Accesibilidad',
    'components.menu.panelMenu.a11y.keyboard.title': 'Teclado',
    'components.menu.panelMenu.a11y.keyboard.desc':
      'La navegacion del menu puede extenderse con soporte de teclado.',
    'components.menu.panelMenu.a11y.visibility.title': 'Visibilidad',
    'components.menu.panelMenu.a11y.visibility.desc':
      'Cambios de color y foco en hover para mejor UX.',
    'components.menu.panelMenu.a11y.semantic.title': 'Semantica',
    'components.menu.panelMenu.a11y.semantic.desc':
      'Usa enlaces para rutas/urls y botones para acciones o toggles internos.',
    'components.menu.panelMenu.items.dashboard': 'Dashboard',
    'components.menu.panelMenu.items.users': 'Usuarios',
    'components.menu.panelMenu.items.list': 'Lista',
    'components.menu.panelMenu.items.create': 'Crear',
    'components.menu.panelMenu.items.reports': 'Reportes',
    'components.menu.panelMenu.items.settings': 'Ajustes',
    'components.menu.panelMenu.items.general': 'General',
    'components.menu.panelMenu.items.profile': 'Perfil',
    'components.menu.panelMenu.items.preferences': 'Preferencias',
    'components.menu.panelMenu.items.security': 'Seguridad',
    'components.menu.panelMenu.items.notifications': 'Notificaciones',
    'components.menu.panelMenu.items.help': 'Ayuda',
    'components.menu.panelMenu.items.tokens': 'Tokens',
    'components.menu.panelMenu.items.activity': 'Actividad',
    'components.menu.panelMenu.status.none': 'Ninguno',
    'components.menu.panelMenu.status.open': 'Abierto',
    'components.menu.panelMenu.status.closed': 'Cerrado',
    'components.menu.panelMenu.status.level': 'Nivel',
    'components.menu.panelMenu.status.expanded': 'Expandido',
    'components.menu.panelMenu.status.collapsed': 'Contraido',
  },
  en: {
    'components.menu.panelMenu.title': 'Magary PanelMenu',
    'components.menu.panelMenu.subtitle':
      'Expandable and customizable side menu component.',
    'components.menu.panelMenu.import.title': 'Import',
    'components.menu.panelMenu.import.desc':
      'Import the component in your standalone component.',
    'components.menu.panelMenu.advanced.title': 'Enhanced events example',
    'components.menu.panelMenu.advanced.desc':
      'Panel menu with advanced features and event handling.',
    'components.menu.panelMenu.layouts.title': 'Layout variants',
    'components.menu.panelMenu.layouts.desc':
      'The component supports accordion, list, rail and grid modes for different navigation contexts.',
    'components.menu.panelMenu.layouts.accordion': 'Accordion',
    'components.menu.panelMenu.layouts.list': 'List',
    'components.menu.panelMenu.layouts.rail': 'Rail Icons',
    'components.menu.panelMenu.layouts.grid': 'Grid',
    'components.menu.panelMenu.tabs.html': 'HTML',
    'components.menu.panelMenu.tabs.typescript': 'TypeScript',
    'components.menu.panelMenu.tabs.events': 'Events',
    'components.menu.panelMenu.apiInputs.title': 'Properties (Inputs)',
    'components.menu.panelMenu.apiInputs.desc':
      'These are the inputs you can configure on the component.',
    'components.menu.panelMenu.apiInputs.header.name': 'Name',
    'components.menu.panelMenu.apiInputs.header.type': 'Type',
    'components.menu.panelMenu.apiInputs.header.default': 'Default Value',
    'components.menu.panelMenu.apiInputs.header.description': 'Description',
    'components.menu.panelMenu.apiInputs.title.desc':
      'Panel title shown in the header.',
    'components.menu.panelMenu.apiInputs.items.desc':
      'List of items that compose the menu.',
    'components.menu.panelMenu.apiInputs.icon.desc':
      'Main panel header icon.',
    'components.menu.panelMenu.apiInputs.iconClass.desc':
      'Additional CSS class for the header icon.',
    'components.menu.panelMenu.apiInputs.style.desc':
      'Inline styles for the panel container.',
    'components.menu.panelMenu.apiInputs.styleClass.desc':
      'Additional CSS class for the panel container.',
    'components.menu.panelMenu.apiInputs.backgroundColor.desc':
      'Panel background color.',
    'components.menu.panelMenu.apiInputs.textColor.desc': 'Text color.',
    'components.menu.panelMenu.apiInputs.hoverColor.desc':
      'Background color when hovering an item.',
    'components.menu.panelMenu.apiInputs.borderRadius.desc':
      'Panel border radius.',
    'components.menu.panelMenu.apiInputs.shadow.desc': 'Panel shadow level.',
    'components.menu.panelMenu.apiInputs.width.desc': 'Panel width.',
    'components.menu.panelMenu.apiInputs.allowMultipleExpanded.desc':
      'Allows multiple expanded items at the same time.',
    'components.menu.panelMenu.apiInputs.defaultOpen.desc':
      'Whether the panel should be open by default.',
    'components.menu.panelMenu.apiInputs.collapsed.desc':
      'Whether the panel is in collapsed mode (used by Sidebar).',
    'components.menu.panelMenu.apiInputs.mode.desc':
      'Visual mode: accordion, list, rail-icons, rail-labeled, or grid.',
    'components.menu.panelMenu.apiInputs.showHeader.desc':
      'Shows or hides the panel header.',
    'components.menu.panelMenu.apiInputs.showItemLabels.desc':
      'Shows or hides item labels in compact modes.',
    'components.menu.panelMenu.apiInputs.gridColumns.desc':
      'Column count when mode="grid".',
    'components.menu.panelMenu.apiInputs.activeIndicator.desc':
      'Enables the active item visual indicator.',
    'components.menu.panelMenu.apiInputs.navigationLabel.desc':
      'ARIA label applied to the panel navigation landmark.',
    'components.menu.panelMenu.apiOutputs.title': 'Events (Outputs)',
    'components.menu.panelMenu.apiOutputs.desc':
      'Events emitted by the component.',
    'components.menu.panelMenu.apiOutputs.header.name': 'Name',
    'components.menu.panelMenu.apiOutputs.header.type': 'Type',
    'components.menu.panelMenu.apiOutputs.header.description': 'Description',
    'components.menu.panelMenu.apiOutputs.menuToggle.desc':
      'Emitted when the panel opens or closes.',
    'components.menu.panelMenu.apiOutputs.itemClick.desc':
      'Emitted when a menu item is clicked.',
    'components.menu.panelMenu.apiOutputs.itemExpand.desc':
      'Emitted when an item expands or collapses.',
    'components.menu.panelMenu.apiOutputs.expandSidebar.desc':
      'Emitted in collapsed mode to request parent sidebar expansion.',
    'components.menu.panelMenu.structure.title': 'Expected structure',
    'components.menu.panelMenu.structure.item1':
      'items must be an array of MenuItem objects.',
    'components.menu.panelMenu.structure.item2':
      'Each MenuItem can have recursive children.',
    'components.menu.panelMenu.structure.item3':
      'Each item can define label, route, url, target, command, and icon.',
    'components.menu.panelMenu.a11y.title': 'Accessibility',
    'components.menu.panelMenu.a11y.keyboard.title': 'Keyboard',
    'components.menu.panelMenu.a11y.keyboard.desc':
      'Menu navigation can be extended with keyboard accessibility support.',
    'components.menu.panelMenu.a11y.visibility.title': 'Visibility',
    'components.menu.panelMenu.a11y.visibility.desc':
      'Color and focus changes on hover for better UX.',
    'components.menu.panelMenu.a11y.semantic.title': 'Semantics',
    'components.menu.panelMenu.a11y.semantic.desc':
      'Uses links for routes/urls and buttons for actions or internal toggles.',
    'components.menu.panelMenu.items.dashboard': 'Dashboard',
    'components.menu.panelMenu.items.users': 'Users',
    'components.menu.panelMenu.items.list': 'List',
    'components.menu.panelMenu.items.create': 'Create',
    'components.menu.panelMenu.items.reports': 'Reports',
    'components.menu.panelMenu.items.settings': 'Settings',
    'components.menu.panelMenu.items.general': 'General',
    'components.menu.panelMenu.items.profile': 'Profile',
    'components.menu.panelMenu.items.preferences': 'Preferences',
    'components.menu.panelMenu.items.security': 'Security',
    'components.menu.panelMenu.items.notifications': 'Notifications',
    'components.menu.panelMenu.items.help': 'Help',
    'components.menu.panelMenu.items.tokens': 'Tokens',
    'components.menu.panelMenu.items.activity': 'Activity',
    'components.menu.panelMenu.status.none': 'None',
    'components.menu.panelMenu.status.open': 'Open',
    'components.menu.panelMenu.status.closed': 'Closed',
    'components.menu.panelMenu.status.level': 'Level',
    'components.menu.panelMenu.status.expanded': 'Expanded',
    'components.menu.panelMenu.status.collapsed': 'Collapsed',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
