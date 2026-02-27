import { DemoLanguage } from '../../../../types';

export const RADIO_DOC_TEXT = {
  es: {
    'components.form.radio.title': 'Magary Radio Button',
    'components.form.radio.subtitle':
      'Componente de seleccion unica estilizado y accesible.',
    'components.form.radio.import.title': 'Importacion',
    'components.form.radio.import.desc':
      'Importa el modulo en tu componente standalone.',
    'components.form.radio.basic.title': 'Uso Basico',
    'components.form.radio.basic.desc': 'Seleccion de opciones simples.',
    'components.form.radio.basic.city.newYork': 'New York',
    'components.form.radio.basic.city.london': 'London',
    'components.form.radio.basic.city.parisDisabled': 'Paris (deshabilitado)',
    'components.form.radio.basic.selectedCity': 'Ciudad seleccionada',
    'components.form.radio.common.none': 'Ninguna',
    'components.form.radio.group.title': 'Radio Group',
    'components.form.radio.group.desc':
      'Genera opciones dinamicamente desde un array y permite layout vertical u horizontal.',
    'components.form.radio.group.paymentMethod': 'Metodo de pago',
    'components.form.radio.group.selectedMethod': 'Metodo seleccionado',
    'components.form.radio.apiGroup.title': 'Referencia API (Group)',
    'components.form.radio.apiGroup.desc':
      'Inputs disponibles para magary-radio-group.',
    'components.form.radio.api.title': 'Referencia API',
    'components.form.radio.api.desc': 'Inputs disponibles para magary-radio.',
    'components.form.radio.api.header.name': 'Nombre',
    'components.form.radio.api.header.type': 'Tipo',
    'components.form.radio.api.header.default': 'Default',
    'components.form.radio.api.header.description': 'Descripcion',
    'components.form.radio.apiGroup.options.desc': 'Lista de opciones.',
    'components.form.radio.apiGroup.layout.desc': 'Orientacion del grupo.',
    'components.form.radio.apiGroup.optionLabel.desc': 'Propiedad para etiqueta.',
    'components.form.radio.apiGroup.optionValue.desc': 'Propiedad para valor.',
    'components.form.radio.api.value.desc': 'Valor del radio button.',
    'components.form.radio.api.name.desc':
      'Nombre del grupo de radios (atributo HTML).',
    'components.form.radio.api.label.desc': 'Texto descriptivo opcional.',
    'components.form.radio.api.inputId.desc':
      'ID del input interno para labels.',
    'components.form.radio.api.disabled.desc':
      'Deshabilita el radio button (soporta atributo HTML).',
  },
  en: {
    'components.form.radio.title': 'Magary Radio Button',
    'components.form.radio.subtitle':
      'Accessible and styled single-selection component.',
    'components.form.radio.import.title': 'Import',
    'components.form.radio.import.desc':
      'Import the module in your standalone component.',
    'components.form.radio.basic.title': 'Basic Usage',
    'components.form.radio.basic.desc': 'Simple option selection.',
    'components.form.radio.basic.city.newYork': 'New York',
    'components.form.radio.basic.city.london': 'London',
    'components.form.radio.basic.city.parisDisabled': 'Paris (disabled)',
    'components.form.radio.basic.selectedCity': 'Selected City',
    'components.form.radio.common.none': 'None',
    'components.form.radio.group.title': 'Radio Group',
    'components.form.radio.group.desc':
      'Build options dynamically from an array and switch between vertical or horizontal layout.',
    'components.form.radio.group.paymentMethod': 'Payment Method',
    'components.form.radio.group.selectedMethod': 'Selected Method',
    'components.form.radio.apiGroup.title': 'API Reference (Group)',
    'components.form.radio.apiGroup.desc':
      'Available inputs for magary-radio-group.',
    'components.form.radio.api.title': 'API Reference',
    'components.form.radio.api.desc': 'Available inputs for magary-radio.',
    'components.form.radio.api.header.name': 'Name',
    'components.form.radio.api.header.type': 'Type',
    'components.form.radio.api.header.default': 'Default',
    'components.form.radio.api.header.description': 'Description',
    'components.form.radio.apiGroup.options.desc': 'Options list.',
    'components.form.radio.apiGroup.layout.desc': 'Group orientation.',
    'components.form.radio.apiGroup.optionLabel.desc':
      'Property used as option label.',
    'components.form.radio.apiGroup.optionValue.desc':
      'Property used as option value.',
    'components.form.radio.api.value.desc': 'Radio button value.',
    'components.form.radio.api.name.desc': 'Radio group name (HTML attribute).',
    'components.form.radio.api.label.desc': 'Optional descriptive label text.',
    'components.form.radio.api.inputId.desc': 'Internal input id for labels.',
    'components.form.radio.api.disabled.desc':
      'Disables the radio button (supports HTML attribute).',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
