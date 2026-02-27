import { DemoLanguage } from '../../../../types';

export const SLIDER_DOC_TEXT = {
  es: {
    'components.form.slider.title': 'Magary Slider',
    'components.form.slider.subtitle':
      'Componente para seleccionar un valor o rango arrastrando un control.',
    'components.form.slider.import.title': 'Importacion',
    'components.form.slider.basic.title': 'Basico',
    'components.form.slider.basic.desc':
      'Configuracion por defecto de seleccion de valor unico.',
    'components.form.slider.basic.valueLabel': 'Valor',
    'components.form.slider.steps.title': 'Steps',
    'components.form.slider.steps.desc':
      'Incrementos definidos por la propiedad step.',
    'components.form.slider.range.title': 'Rango',
    'components.form.slider.range.desc':
      'Seleccion de un rango de valores (inicio y fin).',
    'components.form.slider.range.valueLabel': 'Rango',
    'components.form.slider.vertical.title': 'Vertical',
    'components.form.slider.vertical.desc': 'Orientacion vertical del slider.',
    'components.form.slider.vertical.valueLabel': 'Vertical',
    'components.form.slider.api.title': 'Propiedades (Inputs)',
    'components.form.slider.api.header.name': 'Nombre',
    'components.form.slider.api.header.type': 'Tipo',
    'components.form.slider.api.header.default': 'Por defecto',
    'components.form.slider.api.header.description': 'Descripcion',
    'components.form.slider.api.min.desc': 'Valor minimo.',
    'components.form.slider.api.max.desc': 'Valor maximo.',
    'components.form.slider.api.step.desc': 'Incremento del valor.',
    'components.form.slider.api.range.desc':
      'Permite seleccionar un rango (inicio y fin).',
    'components.form.slider.api.orientation.desc': 'Orientacion del slider.',
    'components.form.slider.api.disabled.desc': 'Deshabilita el componente.',
  },
  en: {
    'components.form.slider.title': 'Magary Slider',
    'components.form.slider.subtitle':
      'Input component to select a value or range by dragging a handle.',
    'components.form.slider.import.title': 'Import',
    'components.form.slider.basic.title': 'Basic',
    'components.form.slider.basic.desc':
      'Default single-value selection configuration.',
    'components.form.slider.basic.valueLabel': 'Value',
    'components.form.slider.steps.title': 'Steps',
    'components.form.slider.steps.desc':
      'Increments defined by the step property.',
    'components.form.slider.range.title': 'Range',
    'components.form.slider.range.desc':
      'Selects a range of values (start and end).',
    'components.form.slider.range.valueLabel': 'Range',
    'components.form.slider.vertical.title': 'Vertical',
    'components.form.slider.vertical.desc': 'Vertical slider orientation.',
    'components.form.slider.vertical.valueLabel': 'Vertical',
    'components.form.slider.api.title': 'Properties (Inputs)',
    'components.form.slider.api.header.name': 'Name',
    'components.form.slider.api.header.type': 'Type',
    'components.form.slider.api.header.default': 'Default',
    'components.form.slider.api.header.description': 'Description',
    'components.form.slider.api.min.desc': 'Minimum value.',
    'components.form.slider.api.max.desc': 'Maximum value.',
    'components.form.slider.api.step.desc': 'Value increment step.',
    'components.form.slider.api.range.desc':
      'Allows range selection (start and end).',
    'components.form.slider.api.orientation.desc': 'Slider orientation.',
    'components.form.slider.api.disabled.desc': 'Disables the component.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
