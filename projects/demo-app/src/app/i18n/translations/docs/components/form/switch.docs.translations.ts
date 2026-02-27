import { DemoLanguage } from '../../../../types';

export const SWITCH_DOC_TEXT = {
  es: {
    'components.form.switch.title': 'MagarySwitch',
    'components.form.switch.subtitle':
      'Componente de interruptor para alternar entre dos estados con animaciones fluidas y soporte de temas.',
    'components.form.switch.import.title': 'Import',
    'components.form.switch.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.form.switch.basic.title': 'Ejemplo Basico',
    'components.form.switch.basic.demoTitle': 'Default',
    'components.form.switch.basic.notifications': 'Notificaciones',
    'components.form.switch.basic.valueLabel': 'Valor',
    'components.form.switch.states.title': 'Estados',
    'components.form.switch.states.desc':
      'Diferentes estados interactivos del componente.',
    'components.form.switch.states.checked': 'Estado encendido',
    'components.form.switch.states.unchecked': 'Estado apagado',
    'components.form.switch.states.disabledChecked': 'Deshabilitado encendido',
    'components.form.switch.states.disabledUnchecked': 'Deshabilitado apagado',
    'components.form.switch.colors.title': 'Colores',
    'components.form.switch.colors.desc': 'Variantes semanticas de color.',
    'components.form.switch.colors.primary': 'Primario',
    'components.form.switch.colors.success': 'Exito',
    'components.form.switch.colors.danger': 'Peligro',
    'components.form.switch.colors.warning': 'Advertencia',
    'components.form.switch.colors.info': 'Info',
    'components.form.switch.api.title': 'API',
    'components.form.switch.api.desc': 'Propiedades y eventos disponibles.',
    'components.form.switch.api.header.name': 'Nombre',
    'components.form.switch.api.header.type': 'Tipo',
    'components.form.switch.api.header.default': 'Default',
    'components.form.switch.api.header.description': 'Descripcion',
    'components.form.switch.api.checked.desc':
      'Valor del switch (two-way binding).',
    'components.form.switch.api.label.desc': 'Texto a mostrar junto al switch.',
    'components.form.switch.api.disabled.desc': 'Deshabilita la interaccion.',
    'components.form.switch.api.color.desc':
      'Color semantico del componente.',
    'components.form.switch.api.change.desc':
      'Evento emitido al cambiar el valor.',
    'components.form.switch.a11y.title': 'Accesibilidad',
    'components.form.switch.a11y.role.title': 'Role',
    'components.form.switch.a11y.role.desc':
      'Usa role="switch" para tecnologias de asistencia.',
    'components.form.switch.a11y.keyboard.title': 'Keyboard Support',
    'components.form.switch.a11y.keyboard.desc':
      'Soporta navegacion con Tab y activacion con Space.',
    'components.form.switch.a11y.aria.title': 'ARIA Attributes',
    'components.form.switch.a11y.aria.desc':
      'Gestiona automaticamente aria-checked para reflejar el estado.',
  },
  en: {
    'components.form.switch.title': 'MagarySwitch',
    'components.form.switch.subtitle':
      'Switch component to toggle between two states with smooth animations and full theme support.',
    'components.form.switch.import.title': 'Import',
    'components.form.switch.import.desc':
      'Import the component in your module or standalone component.',
    'components.form.switch.basic.title': 'Basic Example',
    'components.form.switch.basic.demoTitle': 'Default',
    'components.form.switch.basic.notifications': 'Notifications',
    'components.form.switch.basic.valueLabel': 'Value',
    'components.form.switch.states.title': 'States',
    'components.form.switch.states.desc':
      'Different interactive states for the component.',
    'components.form.switch.states.checked': 'Checked state',
    'components.form.switch.states.unchecked': 'Unchecked state',
    'components.form.switch.states.disabledChecked': 'Disabled checked',
    'components.form.switch.states.disabledUnchecked': 'Disabled unchecked',
    'components.form.switch.colors.title': 'Colors',
    'components.form.switch.colors.desc': 'Semantic color variants.',
    'components.form.switch.colors.primary': 'Primary',
    'components.form.switch.colors.success': 'Success',
    'components.form.switch.colors.danger': 'Danger',
    'components.form.switch.colors.warning': 'Warning',
    'components.form.switch.colors.info': 'Info',
    'components.form.switch.api.title': 'API',
    'components.form.switch.api.desc': 'Available properties and events.',
    'components.form.switch.api.header.name': 'Name',
    'components.form.switch.api.header.type': 'Type',
    'components.form.switch.api.header.default': 'Default',
    'components.form.switch.api.header.description': 'Description',
    'components.form.switch.api.checked.desc': 'Switch value (two-way binding).',
    'components.form.switch.api.label.desc': 'Text shown next to the switch.',
    'components.form.switch.api.disabled.desc': 'Disables interaction.',
    'components.form.switch.api.color.desc': 'Semantic color of the component.',
    'components.form.switch.api.change.desc':
      'Event emitted when the value changes.',
    'components.form.switch.a11y.title': 'Accessibility',
    'components.form.switch.a11y.role.title': 'Role',
    'components.form.switch.a11y.role.desc':
      'Uses role="switch" for assistive technologies.',
    'components.form.switch.a11y.keyboard.title': 'Keyboard Support',
    'components.form.switch.a11y.keyboard.desc':
      'Supports Tab navigation and Space activation.',
    'components.form.switch.a11y.aria.title': 'ARIA Attributes',
    'components.form.switch.a11y.aria.desc':
      'Automatically manages aria-checked to reflect current state.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
