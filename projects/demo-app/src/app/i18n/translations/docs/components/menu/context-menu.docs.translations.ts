import { DemoLanguage } from '../../../../types';

export const CONTEXT_MENU_DOC_TEXT = {
  es: {
    'components.menu.contextMenu.title': 'Context Menu',
    'components.menu.contextMenu.subtitle':
      'ContextMenu muestra un menu al hacer clic derecho.',
    'components.menu.contextMenu.basic.title': 'Ejemplo Basico',
    'components.menu.contextMenu.basic.desc':
      'Haz clic derecho en el cuadro para abrir el menu.',
    'components.menu.contextMenu.basic.target': 'Haz Clic Derecho',
    'components.menu.contextMenu.tabs.html': 'HTML',
    'components.menu.contextMenu.tabs.typescript': 'TypeScript',
    'components.menu.contextMenu.inputs.title': 'Inputs',
    'components.menu.contextMenu.inputs.header.name': 'Nombre',
    'components.menu.contextMenu.inputs.header.type': 'Tipo',
    'components.menu.contextMenu.inputs.header.default': 'Por Defecto',
    'components.menu.contextMenu.inputs.header.description': 'Descripcion',
    'components.menu.contextMenu.inputs.model.desc':
      'Array de elementos del menu.',
    'components.menu.contextMenu.inputs.global.desc':
      'Adjunta el menu al evento de context menu del documento.',
    'components.menu.contextMenu.inputs.target.desc':
      'Adjunta el menu a un elemento especifico.',
    'components.menu.contextMenu.inputs.style.desc':
      'Estilo en linea del componente.',
    'components.menu.contextMenu.inputs.styleClass.desc':
      'Clase de estilo del componente.',
    'components.menu.contextMenu.events.title': 'Eventos',
    'components.menu.contextMenu.events.desc':
      'Este componente no emite eventos. La interaccion se maneja con la propiedad command de MenuItem.',
    'components.menu.contextMenu.menuItem.title': 'Interfaz MenuItem',
    'components.menu.contextMenu.menuItem.desc':
      'Propiedades para los elementos en el array model.',
    'components.menu.contextMenu.menuItem.header.property': 'Propiedad',
    'components.menu.contextMenu.menuItem.header.type': 'Tipo',
    'components.menu.contextMenu.menuItem.header.description': 'Descripcion',
    'components.menu.contextMenu.menuItem.label.desc': 'Texto a mostrar.',
    'components.menu.contextMenu.menuItem.icon.desc':
      'Nombre del icono (Lucide).',
    'components.menu.contextMenu.menuItem.items.desc':
      'Elementos del submenu.',
    'components.menu.contextMenu.menuItem.command.desc':
      'Callback al hacer clic.',
    'components.menu.contextMenu.menuItem.url.desc': 'Enlace externo.',
    'components.menu.contextMenu.menuItem.routerLink.desc':
      'Enlace del router.',
    'components.menu.contextMenu.menuItem.disabled.desc':
      'Estado deshabilitado.',
    'components.menu.contextMenu.menuItem.separator.desc':
      'Linea separadora.',
    'components.menu.contextMenu.menuItem.expanded.desc':
      'Visibilidad del submenu.',
    'components.menu.contextMenu.items.view': 'Ver',
    'components.menu.contextMenu.items.largeIcons': 'Iconos grandes',
    'components.menu.contextMenu.items.list': 'Lista',
    'components.menu.contextMenu.items.sortBy': 'Ordenar por',
    'components.menu.contextMenu.items.name': 'Nombre',
    'components.menu.contextMenu.items.date': 'Fecha',
    'components.menu.contextMenu.items.refresh': 'Refrescar',
    'components.menu.contextMenu.items.properties': 'Propiedades',
    'components.menu.contextMenu.toast.title': 'Menu contextual',
    'components.menu.contextMenu.toast.viewLargeIcons':
      'Vista cambiada a iconos grandes',
    'components.menu.contextMenu.toast.viewList': 'Vista cambiada a lista',
    'components.menu.contextMenu.toast.sortedByName': 'Ordenado por nombre',
    'components.menu.contextMenu.toast.sortedByDate': 'Ordenado por fecha',
    'components.menu.contextMenu.toast.refreshed': 'Actualizado',
    'components.menu.contextMenu.toast.propertiesClicked':
      'Propiedades seleccionadas',
  },
  en: {
    'components.menu.contextMenu.title': 'Context Menu',
    'components.menu.contextMenu.subtitle':
      'ContextMenu displays a menu when right-clicking.',
    'components.menu.contextMenu.basic.title': 'Basic Example',
    'components.menu.contextMenu.basic.desc':
      'Right click on the area below to open the menu.',
    'components.menu.contextMenu.basic.target': 'Right Click Me',
    'components.menu.contextMenu.tabs.html': 'HTML',
    'components.menu.contextMenu.tabs.typescript': 'TypeScript',
    'components.menu.contextMenu.inputs.title': 'Inputs',
    'components.menu.contextMenu.inputs.header.name': 'Name',
    'components.menu.contextMenu.inputs.header.type': 'Type',
    'components.menu.contextMenu.inputs.header.default': 'Default',
    'components.menu.contextMenu.inputs.header.description': 'Description',
    'components.menu.contextMenu.inputs.model.desc': 'Array of menu items.',
    'components.menu.contextMenu.inputs.global.desc':
      'Attaches the menu to the document context menu event.',
    'components.menu.contextMenu.inputs.target.desc':
      'Attaches the menu to a specific element.',
    'components.menu.contextMenu.inputs.style.desc':
      'Inline style of the component.',
    'components.menu.contextMenu.inputs.styleClass.desc':
      'Style class of the component.',
    'components.menu.contextMenu.events.title': 'Events',
    'components.menu.contextMenu.events.desc':
      'This component does not emit events. Interaction is handled through the MenuItem command property.',
    'components.menu.contextMenu.menuItem.title': 'MenuItem Interface',
    'components.menu.contextMenu.menuItem.desc':
      'Properties for items in the model array.',
    'components.menu.contextMenu.menuItem.header.property': 'Property',
    'components.menu.contextMenu.menuItem.header.type': 'Type',
    'components.menu.contextMenu.menuItem.header.description': 'Description',
    'components.menu.contextMenu.menuItem.label.desc': 'Text to display.',
    'components.menu.contextMenu.menuItem.icon.desc':
      'Icon name (Lucide).',
    'components.menu.contextMenu.menuItem.items.desc': 'Submenu items.',
    'components.menu.contextMenu.menuItem.command.desc':
      'Callback executed on click.',
    'components.menu.contextMenu.menuItem.url.desc': 'External link.',
    'components.menu.contextMenu.menuItem.routerLink.desc':
      'Router navigation link.',
    'components.menu.contextMenu.menuItem.disabled.desc': 'Disabled state.',
    'components.menu.contextMenu.menuItem.separator.desc':
      'Separator line.',
    'components.menu.contextMenu.menuItem.expanded.desc':
      'Submenu visibility.',
    'components.menu.contextMenu.items.view': 'View',
    'components.menu.contextMenu.items.largeIcons': 'Large Icons',
    'components.menu.contextMenu.items.list': 'List',
    'components.menu.contextMenu.items.sortBy': 'Sort By',
    'components.menu.contextMenu.items.name': 'Name',
    'components.menu.contextMenu.items.date': 'Date',
    'components.menu.contextMenu.items.refresh': 'Refresh',
    'components.menu.contextMenu.items.properties': 'Properties',
    'components.menu.contextMenu.toast.title': 'Context Menu',
    'components.menu.contextMenu.toast.viewLargeIcons':
      'View changed to Large Icons',
    'components.menu.contextMenu.toast.viewList': 'View changed to List',
    'components.menu.contextMenu.toast.sortedByName': 'Sorted by Name',
    'components.menu.contextMenu.toast.sortedByDate': 'Sorted by Date',
    'components.menu.contextMenu.toast.refreshed': 'Refreshed',
    'components.menu.contextMenu.toast.propertiesClicked':
      'Properties clicked',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
