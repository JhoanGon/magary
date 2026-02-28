import { DemoLanguage } from '../../../../types';

export const SPLIT_BUTTON_DOC_TEXT = {
  es: {
    'components.buttons.splitButton.title': 'SplitButton',
    'components.buttons.splitButton.subtitle':
      'Boton que agrupa una accion por defecto y un menu desplegable.',
    'components.buttons.splitButton.import.title': 'Importar',
    'components.buttons.splitButton.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.buttons.splitButton.basic.title': 'Uso Basico',
    'components.buttons.splitButton.basic.cardTitle': 'Por defecto',
    'components.buttons.splitButton.basic.save': 'Guardar',
    'components.buttons.splitButton.severity.title': 'Severidades',
    'components.buttons.splitButton.severity.desc':
      'Colores semanticos para diferentes acciones.',
    'components.buttons.splitButton.severity.cardTitle': 'Colores',
    'components.buttons.splitButton.severity.secondary': 'Secondary',
    'components.buttons.splitButton.severity.success': 'Success',
    'components.buttons.splitButton.severity.info': 'Info',
    'components.buttons.splitButton.severity.warning': 'Warning',
    'components.buttons.splitButton.severity.danger': 'Danger',
    'components.buttons.splitButton.custom.title': 'Colores personalizados',
    'components.buttons.splitButton.custom.desc':
      'Control total de color de fondo y color de texto/iconos.',
    'components.buttons.splitButton.custom.cardTitle': 'Custom',
    'components.buttons.splitButton.custom.label': 'Custom',
    'components.buttons.splitButton.sizes.title': 'Tamanos',
    'components.buttons.splitButton.sizes.desc':
      'Diferentes tamanos disponibles.',
    'components.buttons.splitButton.sizes.small.cardTitle': 'Pequeno',
    'components.buttons.splitButton.sizes.small.label': 'Small',
    'components.buttons.splitButton.sizes.normal.cardTitle': 'Normal',
    'components.buttons.splitButton.sizes.normal.label': 'Normal',
    'components.buttons.splitButton.sizes.large.cardTitle': 'Grande',
    'components.buttons.splitButton.sizes.large.label': 'Large',
    'components.buttons.splitButton.apiInputs.title': 'Propiedades (Inputs)',
    'components.buttons.splitButton.apiInputs.header.name': 'Nombre',
    'components.buttons.splitButton.apiInputs.header.type': 'Tipo',
    'components.buttons.splitButton.apiInputs.header.default': 'Default',
    'components.buttons.splitButton.apiInputs.header.description': 'Descripcion',
    'components.buttons.splitButton.apiInputs.label.desc':
      'Texto a mostrar en el boton principal.',
    'components.buttons.splitButton.apiInputs.icon.desc':
      'Nombre del icono (Lucide) para el boton principal.',
    'components.buttons.splitButton.apiInputs.iconSize.desc':
      'Tamano del icono en pixeles.',
    'components.buttons.splitButton.apiInputs.model.desc':
      'Array de elementos del menu desplegable.',
    'components.buttons.splitButton.apiInputs.disabled.desc':
      'Deshabilita el componente.',
    'components.buttons.splitButton.apiInputs.styleClass.desc':
      'Clase CSS externa para estilos.',
    'components.buttons.splitButton.apiInputs.backgroundColor.desc':
      'Color de fondo personalizado para el contenedor.',
    'components.buttons.splitButton.apiInputs.textColor.desc':
      'Color personalizado para texto e iconos.',
    'components.buttons.splitButton.apiInputs.severity.desc':
      'Preset de color semantico.',
    'components.buttons.splitButton.apiInputs.size.desc':
      'Controla tamano y espaciado.',
    'components.buttons.splitButton.apiInputs.menuPosition.desc':
      'Alineacion del menu respecto al trigger.',
    'components.buttons.splitButton.apiInputs.menuAriaLabel.desc':
      'Etiqueta accesible personalizada para el menu.',
    'components.buttons.splitButton.apiInputs.closeOnItemSelect.desc':
      'Cierra menu automaticamente al seleccionar un item.',
    'components.buttons.splitButton.apiOutputs.title': 'Eventos (Outputs)',
    'components.buttons.splitButton.apiOutputs.header.name': 'Nombre',
    'components.buttons.splitButton.apiOutputs.header.type': 'Tipo',
    'components.buttons.splitButton.apiOutputs.header.description': 'Descripcion',
    'components.buttons.splitButton.apiOutputs.onClick.desc':
      'Se dispara al hacer click en el boton principal.',
    'components.buttons.splitButton.apiOutputs.onDropdownClick.desc':
      'Se dispara al hacer click en el trigger del menu.',
    'components.buttons.splitButton.apiOutputs.itemClick.desc':
      'Se emite al activar un item del menu.',
    'components.buttons.splitButton.menuItem.title': 'Interfaz MenuItem',
    'components.buttons.splitButton.menuItem.desc':
      'Propiedades para los elementos del array model.',
    'components.buttons.splitButton.menuItem.header.property': 'Propiedad',
    'components.buttons.splitButton.menuItem.header.type': 'Tipo',
    'components.buttons.splitButton.menuItem.header.description': 'Descripcion',
    'components.buttons.splitButton.menuItem.label.desc':
      'Texto visible del item de menu.',
    'components.buttons.splitButton.menuItem.icon.desc':
      'Nombre del icono (Lucide).',
    'components.buttons.splitButton.menuItem.command.desc':
      'Callback ejecutado al hacer click en el item.',
    'components.buttons.splitButton.menuItem.url.desc':
      'Enlace externo para navegacion.',
    'components.buttons.splitButton.menuItem.routerLink.desc':
      'Ruta interna para navegacion con router.',
    'components.buttons.splitButton.menuItem.disabled.desc':
      'Si es true, el item queda deshabilitado.',
    'components.buttons.splitButton.action.update': 'Update',
    'components.buttons.splitButton.action.delete': 'Delete',
    'components.buttons.splitButton.action.export': 'Export',
    'components.buttons.splitButton.toast.savedTitle': 'Guardado',
    'components.buttons.splitButton.toast.savedMessage':
      'Accion por defecto ejecutada',
    'components.buttons.splitButton.toast.actionMessage':
      'Accion completada correctamente',
  },
  en: {
    'components.buttons.splitButton.title': 'SplitButton',
    'components.buttons.splitButton.subtitle':
      'Button that combines a default action with a dropdown menu.',
    'components.buttons.splitButton.import.title': 'Import',
    'components.buttons.splitButton.import.desc':
      'Import the component in your module or standalone component.',
    'components.buttons.splitButton.basic.title': 'Basic Usage',
    'components.buttons.splitButton.basic.cardTitle': 'Default',
    'components.buttons.splitButton.basic.save': 'Save',
    'components.buttons.splitButton.severity.title': 'Severities',
    'components.buttons.splitButton.severity.desc':
      'Semantic colors for different actions.',
    'components.buttons.splitButton.severity.cardTitle': 'Colors',
    'components.buttons.splitButton.severity.secondary': 'Secondary',
    'components.buttons.splitButton.severity.success': 'Success',
    'components.buttons.splitButton.severity.info': 'Info',
    'components.buttons.splitButton.severity.warning': 'Warning',
    'components.buttons.splitButton.severity.danger': 'Danger',
    'components.buttons.splitButton.custom.title': 'Custom Colors',
    'components.buttons.splitButton.custom.desc':
      'Full control of background and text/icon colors.',
    'components.buttons.splitButton.custom.cardTitle': 'Custom',
    'components.buttons.splitButton.custom.label': 'Custom',
    'components.buttons.splitButton.sizes.title': 'Sizes',
    'components.buttons.splitButton.sizes.desc': 'Different available sizes.',
    'components.buttons.splitButton.sizes.small.cardTitle': 'Small',
    'components.buttons.splitButton.sizes.small.label': 'Small',
    'components.buttons.splitButton.sizes.normal.cardTitle': 'Normal',
    'components.buttons.splitButton.sizes.normal.label': 'Normal',
    'components.buttons.splitButton.sizes.large.cardTitle': 'Large',
    'components.buttons.splitButton.sizes.large.label': 'Large',
    'components.buttons.splitButton.apiInputs.title': 'Properties (Inputs)',
    'components.buttons.splitButton.apiInputs.header.name': 'Name',
    'components.buttons.splitButton.apiInputs.header.type': 'Type',
    'components.buttons.splitButton.apiInputs.header.default': 'Default',
    'components.buttons.splitButton.apiInputs.header.description': 'Description',
    'components.buttons.splitButton.apiInputs.label.desc':
      'Text displayed on the main button.',
    'components.buttons.splitButton.apiInputs.icon.desc':
      'Icon name (Lucide) for the main button.',
    'components.buttons.splitButton.apiInputs.iconSize.desc':
      'Icon size in pixels.',
    'components.buttons.splitButton.apiInputs.model.desc':
      'Array of dropdown menu items.',
    'components.buttons.splitButton.apiInputs.disabled.desc':
      'Disables the component.',
    'components.buttons.splitButton.apiInputs.styleClass.desc':
      'External CSS class for styling.',
    'components.buttons.splitButton.apiInputs.backgroundColor.desc':
      'Custom background color for the root container.',
    'components.buttons.splitButton.apiInputs.textColor.desc':
      'Custom text and icon color.',
    'components.buttons.splitButton.apiInputs.severity.desc':
      'Semantic color preset.',
    'components.buttons.splitButton.apiInputs.size.desc':
      'Controls component size and spacing.',
    'components.buttons.splitButton.apiInputs.menuPosition.desc':
      'Dropdown alignment relative to the trigger.',
    'components.buttons.splitButton.apiInputs.menuAriaLabel.desc':
      'Custom accessible label for the menu.',
    'components.buttons.splitButton.apiInputs.closeOnItemSelect.desc':
      'Automatically closes the menu after selecting an item.',
    'components.buttons.splitButton.apiOutputs.title': 'Events (Outputs)',
    'components.buttons.splitButton.apiOutputs.header.name': 'Name',
    'components.buttons.splitButton.apiOutputs.header.type': 'Type',
    'components.buttons.splitButton.apiOutputs.header.description': 'Description',
    'components.buttons.splitButton.apiOutputs.onClick.desc':
      'Triggered when the main button is clicked.',
    'components.buttons.splitButton.apiOutputs.onDropdownClick.desc':
      'Triggered when the dropdown trigger is clicked.',
    'components.buttons.splitButton.apiOutputs.itemClick.desc':
      'Emitted when a menu item is activated.',
    'components.buttons.splitButton.menuItem.title': 'MenuItem Interface',
    'components.buttons.splitButton.menuItem.desc':
      'Properties for elements inside the model array.',
    'components.buttons.splitButton.menuItem.header.property': 'Property',
    'components.buttons.splitButton.menuItem.header.type': 'Type',
    'components.buttons.splitButton.menuItem.header.description': 'Description',
    'components.buttons.splitButton.menuItem.label.desc':
      'Visible text of the menu item.',
    'components.buttons.splitButton.menuItem.icon.desc': 'Icon name (Lucide).',
    'components.buttons.splitButton.menuItem.command.desc':
      'Callback executed when clicking the item.',
    'components.buttons.splitButton.menuItem.url.desc':
      'External link for navigation.',
    'components.buttons.splitButton.menuItem.routerLink.desc':
      'Internal route for router navigation.',
    'components.buttons.splitButton.menuItem.disabled.desc':
      'If true, the item is disabled.',
    'components.buttons.splitButton.action.update': 'Update',
    'components.buttons.splitButton.action.delete': 'Delete',
    'components.buttons.splitButton.action.export': 'Export',
    'components.buttons.splitButton.toast.savedTitle': 'Saved',
    'components.buttons.splitButton.toast.savedMessage': 'Default action triggered',
    'components.buttons.splitButton.toast.actionMessage':
      'Action completed successfully',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
