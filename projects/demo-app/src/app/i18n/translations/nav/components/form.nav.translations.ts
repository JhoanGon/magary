import { DemoLanguage } from '../../../types';

export const FORM_NAV_TEXT = {
  es: {
    Form: 'Formularios',
    'Cascade Select': 'Selector en cascada',
    Checkbox: 'Casilla',
    Input: 'Entrada',
    Switch: 'Interruptor',
    Segmented: 'Segmentado',
    Select: 'Selector',
    Radio: 'Radio',
    TextArea: 'Area de texto',
    DatePicker: 'Selector de fecha',
    InputNumber: 'Entrada numerica',
    Slider: 'Deslizador',
    Rating: 'Calificacion',
  },
  en: {
    Form: 'Form',
    'Cascade Select': 'Cascade Select',
    Checkbox: 'Checkbox',
    Input: 'Input',
    Switch: 'Switch',
    Segmented: 'Segmented',
    Select: 'Select',
    Radio: 'Radio',
    TextArea: 'Text Area',
    DatePicker: 'Date Picker',
    InputNumber: 'Input Number',
    Slider: 'Slider',
    Rating: 'Rating',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
