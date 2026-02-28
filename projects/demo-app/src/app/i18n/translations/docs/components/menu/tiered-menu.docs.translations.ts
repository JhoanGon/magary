import { DemoLanguage } from '../../../../types';

export const TIERED_MENU_DOC_TEXT = {
  es: {
    'components.menu.tieredMenu.title': 'Tiered Menu',
    'components.menu.tieredMenu.subtitle':
      'TieredMenu muestra submenus en capas anidadas.',
    'components.menu.tieredMenu.inline.title': 'Inline',
    'components.menu.tieredMenu.popup.title': 'Popup',
    'components.menu.tieredMenu.popup.button': 'Mostrar menu',
    'components.menu.tieredMenu.tabs.html': 'HTML',
    'components.menu.tieredMenu.tabs.typescript': 'TypeScript',
    'components.menu.tieredMenu.inputs.title': 'Inputs',
    'components.menu.tieredMenu.inputs.header.name': 'Nombre',
    'components.menu.tieredMenu.inputs.header.type': 'Tipo',
    'components.menu.tieredMenu.inputs.header.default': 'Por Defecto',
    'components.menu.tieredMenu.inputs.header.description': 'Descripcion',
    'components.menu.tieredMenu.inputs.model.desc':
      'Array de elementos del menu.',
    'components.menu.tieredMenu.inputs.popup.desc':
      'Define si el menu funciona en modo popup.',
    'components.menu.tieredMenu.inputs.style.desc':
      'Estilo en linea del componente.',
    'components.menu.tieredMenu.inputs.styleClass.desc':
      'Clase de estilo del componente.',
    'components.menu.tieredMenu.events.title': 'Eventos',
    'components.menu.tieredMenu.events.desc':
      'Este componente no emite eventos. La interaccion se maneja con la propiedad command de MenuItem.',
    'components.menu.tieredMenu.menuItem.title': 'Interfaz MenuItem',
    'components.menu.tieredMenu.menuItem.desc':
      'Propiedades para los elementos en el array model.',
    'components.menu.tieredMenu.menuItem.header.property': 'Propiedad',
    'components.menu.tieredMenu.menuItem.header.type': 'Tipo',
    'components.menu.tieredMenu.menuItem.header.description': 'Descripcion',
    'components.menu.tieredMenu.menuItem.label.desc': 'Texto a mostrar.',
    'components.menu.tieredMenu.menuItem.icon.desc':
      'Nombre del icono (Lucide).',
    'components.menu.tieredMenu.menuItem.items.desc':
      'Elementos del submenu.',
    'components.menu.tieredMenu.menuItem.command.desc':
      'Callback al hacer clic.',
    'components.menu.tieredMenu.menuItem.url.desc': 'Enlace externo.',
    'components.menu.tieredMenu.menuItem.routerLink.desc':
      'Enlace del router.',
    'components.menu.tieredMenu.menuItem.disabled.desc':
      'Estado deshabilitado.',
    'components.menu.tieredMenu.menuItem.separator.desc':
      'Linea separadora.',
    'components.menu.tieredMenu.menuItem.expanded.desc':
      'Visibilidad del submenu.',
    'components.menu.tieredMenu.items.file': 'Archivo',
    'components.menu.tieredMenu.items.new': 'Nuevo',
    'components.menu.tieredMenu.items.document': 'Documento',
    'components.menu.tieredMenu.items.image': 'Imagen',
    'components.menu.tieredMenu.items.video': 'Video',
    'components.menu.tieredMenu.items.open': 'Abrir',
    'components.menu.tieredMenu.items.print': 'Imprimir',
    'components.menu.tieredMenu.items.edit': 'Editar',
    'components.menu.tieredMenu.items.copy': 'Copiar',
    'components.menu.tieredMenu.items.cut': 'Cortar',
    'components.menu.tieredMenu.items.paste': 'Pegar',
    'components.menu.tieredMenu.items.help': 'Ayuda',
    'components.menu.tieredMenu.items.about': 'Acerca de',
    'components.menu.tieredMenu.toast.newDocumentTitle': 'Nuevo documento',
    'components.menu.tieredMenu.toast.newDocumentMessage':
      'Documento creado correctamente',
    'components.menu.tieredMenu.toast.newImageTitle': 'Nueva imagen',
    'components.menu.tieredMenu.toast.newImageMessage':
      'Imagen creada correctamente',
    'components.menu.tieredMenu.toast.newVideoTitle': 'Nuevo video',
    'components.menu.tieredMenu.toast.newVideoMessage':
      'Video creado correctamente',
    'components.menu.tieredMenu.toast.openTitle': 'Abrir',
    'components.menu.tieredMenu.toast.openMessage':
      'Dialogo de archivos abierto',
    'components.menu.tieredMenu.toast.printTitle': 'Imprimir',
    'components.menu.tieredMenu.toast.printMessage': 'Imprimiendo documento',
    'components.menu.tieredMenu.toast.copyTitle': 'Copiar',
    'components.menu.tieredMenu.toast.copyMessage':
      'Copiado al portapapeles',
    'components.menu.tieredMenu.toast.cutTitle': 'Cortar',
    'components.menu.tieredMenu.toast.cutMessage': 'Cortado al portapapeles',
    'components.menu.tieredMenu.toast.pasteTitle': 'Pegar',
    'components.menu.tieredMenu.toast.pasteMessage':
      'Pegado desde portapapeles',
    'components.menu.tieredMenu.toast.aboutTitle': 'Acerca de',
    'components.menu.tieredMenu.toast.aboutMessage': 'Magary UI v1.0',
  },
  en: {
    'components.menu.tieredMenu.title': 'Tiered Menu',
    'components.menu.tieredMenu.subtitle':
      'TieredMenu displays submenus in nested layers.',
    'components.menu.tieredMenu.inline.title': 'Inline',
    'components.menu.tieredMenu.popup.title': 'Popup',
    'components.menu.tieredMenu.popup.button': 'Show Menu',
    'components.menu.tieredMenu.tabs.html': 'HTML',
    'components.menu.tieredMenu.tabs.typescript': 'TypeScript',
    'components.menu.tieredMenu.inputs.title': 'Inputs',
    'components.menu.tieredMenu.inputs.header.name': 'Name',
    'components.menu.tieredMenu.inputs.header.type': 'Type',
    'components.menu.tieredMenu.inputs.header.default': 'Default',
    'components.menu.tieredMenu.inputs.header.description': 'Description',
    'components.menu.tieredMenu.inputs.model.desc': 'Array of menu items.',
    'components.menu.tieredMenu.inputs.popup.desc':
      'Defines whether the menu is in popup mode.',
    'components.menu.tieredMenu.inputs.style.desc':
      'Inline style of the component.',
    'components.menu.tieredMenu.inputs.styleClass.desc':
      'Style class of the component.',
    'components.menu.tieredMenu.events.title': 'Events',
    'components.menu.tieredMenu.events.desc':
      'This component does not emit events. Interaction is handled through the MenuItem command property.',
    'components.menu.tieredMenu.menuItem.title': 'MenuItem Interface',
    'components.menu.tieredMenu.menuItem.desc':
      'Properties for items in the model array.',
    'components.menu.tieredMenu.menuItem.header.property': 'Property',
    'components.menu.tieredMenu.menuItem.header.type': 'Type',
    'components.menu.tieredMenu.menuItem.header.description': 'Description',
    'components.menu.tieredMenu.menuItem.label.desc': 'Text to display.',
    'components.menu.tieredMenu.menuItem.icon.desc':
      'Icon name (Lucide).',
    'components.menu.tieredMenu.menuItem.items.desc': 'Submenu items.',
    'components.menu.tieredMenu.menuItem.command.desc':
      'Callback executed on click.',
    'components.menu.tieredMenu.menuItem.url.desc': 'External link.',
    'components.menu.tieredMenu.menuItem.routerLink.desc':
      'Router navigation link.',
    'components.menu.tieredMenu.menuItem.disabled.desc': 'Disabled state.',
    'components.menu.tieredMenu.menuItem.separator.desc':
      'Separator line.',
    'components.menu.tieredMenu.menuItem.expanded.desc':
      'Submenu visibility.',
    'components.menu.tieredMenu.items.file': 'File',
    'components.menu.tieredMenu.items.new': 'New',
    'components.menu.tieredMenu.items.document': 'Document',
    'components.menu.tieredMenu.items.image': 'Image',
    'components.menu.tieredMenu.items.video': 'Video',
    'components.menu.tieredMenu.items.open': 'Open',
    'components.menu.tieredMenu.items.print': 'Print',
    'components.menu.tieredMenu.items.edit': 'Edit',
    'components.menu.tieredMenu.items.copy': 'Copy',
    'components.menu.tieredMenu.items.cut': 'Cut',
    'components.menu.tieredMenu.items.paste': 'Paste',
    'components.menu.tieredMenu.items.help': 'Help',
    'components.menu.tieredMenu.items.about': 'About',
    'components.menu.tieredMenu.toast.newDocumentTitle': 'New Document',
    'components.menu.tieredMenu.toast.newDocumentMessage':
      'Created new document',
    'components.menu.tieredMenu.toast.newImageTitle': 'New Image',
    'components.menu.tieredMenu.toast.newImageMessage': 'Created new image',
    'components.menu.tieredMenu.toast.newVideoTitle': 'New Video',
    'components.menu.tieredMenu.toast.newVideoMessage': 'Created new video',
    'components.menu.tieredMenu.toast.openTitle': 'Open',
    'components.menu.tieredMenu.toast.openMessage': 'Open file dialog',
    'components.menu.tieredMenu.toast.printTitle': 'Print',
    'components.menu.tieredMenu.toast.printMessage': 'Printing document',
    'components.menu.tieredMenu.toast.copyTitle': 'Copy',
    'components.menu.tieredMenu.toast.copyMessage': 'Copied to clipboard',
    'components.menu.tieredMenu.toast.cutTitle': 'Cut',
    'components.menu.tieredMenu.toast.cutMessage': 'Cut to clipboard',
    'components.menu.tieredMenu.toast.pasteTitle': 'Paste',
    'components.menu.tieredMenu.toast.pasteMessage': 'Pasted from clipboard',
    'components.menu.tieredMenu.toast.aboutTitle': 'About',
    'components.menu.tieredMenu.toast.aboutMessage': 'Magary UI v1.0',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
