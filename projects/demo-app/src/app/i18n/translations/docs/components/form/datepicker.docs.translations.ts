import { DemoLanguage } from '../../../../types';

export const DATEPICKER_DOC_TEXT = {
  es: {
    'components.form.datepicker.title': 'Magary DatePicker',
    'components.form.datepicker.subtitle':
      'Selector de fecha intuitivo con calendario popup.',
    'components.form.datepicker.import.title': 'Importacion',
    'components.form.datepicker.import.desc':
      'Importa el modulo en tu componente standalone.',
    'components.form.datepicker.basic.title': 'Uso Basico',
    'components.form.datepicker.basic.desc': 'Seleccion de fecha simple.',
    'components.form.datepicker.basic.label.date': 'Fecha',
    'components.form.datepicker.basic.placeholder.date': 'Selecciona una fecha',
    'components.form.datepicker.basic.selectedLabel': 'Seleccionado',
    'components.form.datepicker.basic.label.disabled': 'Deshabilitado',
    'components.form.datepicker.basic.placeholder.disabled': 'Deshabilitado',
    'components.form.datepicker.advanced.title': 'Funciones avanzadas',
    'components.form.datepicker.advanced.desc':
      'Navegacion inteligente, input manual y restricciones de rango.',
    'components.form.datepicker.advanced.label.minMax':
      'Fecha minima y maxima (siguientes 7 dias)',
    'components.form.datepicker.advanced.placeholder':
      'Tambien puedes escribir manualmente',
    'components.form.datepicker.range.title': 'Seleccion de rango',
    'components.form.datepicker.range.desc':
      'Selecciona un rango de fechas (inicio y fin).',
    'components.form.datepicker.range.label': 'Rango de fechas',
    'components.form.datepicker.range.placeholder': 'Selecciona un rango',
    'components.form.datepicker.common.none': 'Ninguno',
    'components.form.datepicker.api.title': 'Referencia API',
    'components.form.datepicker.api.desc':
      'Inputs disponibles para magary-datepicker.',
    'components.form.datepicker.api.header.name': 'Nombre',
    'components.form.datepicker.api.header.type': 'Tipo',
    'components.form.datepicker.api.header.default': 'Default',
    'components.form.datepicker.api.header.description': 'Descripcion',
    'components.form.datepicker.api.ngModel.desc':
      'Vincula el valor de la fecha o rango.',
    'components.form.datepicker.api.selectionMode.desc': 'Modo de seleccion.',
    'components.form.datepicker.api.minDate.desc': 'Fecha minima permitida.',
    'components.form.datepicker.api.maxDate.desc': 'Fecha maxima permitida.',
    'components.form.datepicker.api.placeholder.desc': 'Texto de ayuda.',
    'components.form.datepicker.api.disabled.desc': 'Deshabilita el selector.',
  },
  en: {
    'components.form.datepicker.title': 'Magary DatePicker',
    'components.form.datepicker.subtitle':
      'Intuitive date picker with popup calendar.',
    'components.form.datepicker.import.title': 'Import',
    'components.form.datepicker.import.desc':
      'Import the module in your standalone component.',
    'components.form.datepicker.basic.title': 'Basic Usage',
    'components.form.datepicker.basic.desc': 'Simple date selection.',
    'components.form.datepicker.basic.label.date': 'Date',
    'components.form.datepicker.basic.placeholder.date': 'Select a date',
    'components.form.datepicker.basic.selectedLabel': 'Selected',
    'components.form.datepicker.basic.label.disabled': 'Disabled',
    'components.form.datepicker.basic.placeholder.disabled': 'Disabled',
    'components.form.datepicker.advanced.title': 'Advanced Features',
    'components.form.datepicker.advanced.desc':
      'Smart navigation, manual input, and range constraints.',
    'components.form.datepicker.advanced.label.minMax':
      'Min & Max Date (next 7 days)',
    'components.form.datepicker.advanced.placeholder': 'Manual input is supported',
    'components.form.datepicker.range.title': 'Range Selection',
    'components.form.datepicker.range.desc':
      'Select a date range (start and end).',
    'components.form.datepicker.range.label': 'Date Range',
    'components.form.datepicker.range.placeholder': 'Select range',
    'components.form.datepicker.common.none': 'None',
    'components.form.datepicker.api.title': 'API Reference',
    'components.form.datepicker.api.desc':
      'Available inputs for magary-datepicker.',
    'components.form.datepicker.api.header.name': 'Name',
    'components.form.datepicker.api.header.type': 'Type',
    'components.form.datepicker.api.header.default': 'Default',
    'components.form.datepicker.api.header.description': 'Description',
    'components.form.datepicker.api.ngModel.desc':
      'Binds date or range value.',
    'components.form.datepicker.api.selectionMode.desc': 'Selection mode.',
    'components.form.datepicker.api.minDate.desc': 'Minimum allowed date.',
    'components.form.datepicker.api.maxDate.desc': 'Maximum allowed date.',
    'components.form.datepicker.api.placeholder.desc': 'Helper text.',
    'components.form.datepicker.api.disabled.desc': 'Disables the picker.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
