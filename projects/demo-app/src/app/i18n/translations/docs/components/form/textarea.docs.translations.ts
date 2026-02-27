import { DemoLanguage } from '../../../../types';

export const TEXTAREA_DOC_TEXT = {
  es: {
    'components.form.textarea.title': 'Magary TextArea',
    'components.form.textarea.subtitle':
      'Area de texto con auto resize y soporte CVA.',
    'components.form.textarea.import.title': 'Importacion',
    'components.form.textarea.import.desc':
      'Importa el modulo en tu componente standalone.',
    'components.form.textarea.basic.title': 'Uso Basico',
    'components.form.textarea.basic.desc': 'Textarea simple y con auto resize.',
    'components.form.textarea.basic.label.basic': 'Basico',
    'components.form.textarea.basic.placeholder.basic': 'Escribe algo...',
    'components.form.textarea.basic.label.autoResize': 'Auto Resize',
    'components.form.textarea.basic.placeholder.autoResize':
      'Escribe y mira como crece...',
    'components.form.textarea.basic.label.disabled': 'Deshabilitado',
    'components.form.textarea.basic.placeholder.disabled': 'Deshabilitado',
    'components.form.textarea.counter.title': 'Contador de caracteres',
    'components.form.textarea.counter.desc':
      'Contador de caracteres y limite de input.',
    'components.form.textarea.counter.label': 'Con MaxLength (20)',
    'components.form.textarea.counter.placeholder': 'Max 20 chars',
    'components.form.textarea.api.title': 'Referencia API',
    'components.form.textarea.api.desc':
      'Inputs disponibles para magary-textarea.',
    'components.form.textarea.api.header.name': 'Nombre',
    'components.form.textarea.api.header.type': 'Tipo',
    'components.form.textarea.api.header.default': 'Default',
    'components.form.textarea.api.header.description': 'Descripcion',
    'components.form.textarea.api.rows.desc': 'Filas iniciales.',
    'components.form.textarea.api.cols.desc': 'Columnas iniciales.',
    'components.form.textarea.api.placeholder.desc': 'Texto de ayuda.',
    'components.form.textarea.api.autoResize.desc':
      'Ajusta automaticamente la altura al contenido.',
    'components.form.textarea.api.maxlength.desc': 'Limite de caracteres.',
    'components.form.textarea.api.showCounter.desc':
      'Muestra el contador current / max.',
    'components.form.textarea.api.disabled.desc': 'Deshabilita el textarea.',
  },
  en: {
    'components.form.textarea.title': 'Magary TextArea',
    'components.form.textarea.subtitle':
      'Text area with auto resize and CVA support.',
    'components.form.textarea.import.title': 'Import',
    'components.form.textarea.import.desc':
      'Import the module in your standalone component.',
    'components.form.textarea.basic.title': 'Basic Usage',
    'components.form.textarea.basic.desc': 'Simple textarea and auto resize.',
    'components.form.textarea.basic.label.basic': 'Basic',
    'components.form.textarea.basic.placeholder.basic': 'Type something...',
    'components.form.textarea.basic.label.autoResize': 'Auto Resize',
    'components.form.textarea.basic.placeholder.autoResize':
      'Type and watch me grow...',
    'components.form.textarea.basic.label.disabled': 'Disabled',
    'components.form.textarea.basic.placeholder.disabled': 'Disabled',
    'components.form.textarea.counter.title': 'Character Counter',
    'components.form.textarea.counter.desc':
      'Character counter and input limit.',
    'components.form.textarea.counter.label': 'With MaxLength (20)',
    'components.form.textarea.counter.placeholder': 'Max 20 chars',
    'components.form.textarea.api.title': 'API Reference',
    'components.form.textarea.api.desc':
      'Available inputs for magary-textarea.',
    'components.form.textarea.api.header.name': 'Name',
    'components.form.textarea.api.header.type': 'Type',
    'components.form.textarea.api.header.default': 'Default',
    'components.form.textarea.api.header.description': 'Description',
    'components.form.textarea.api.rows.desc': 'Initial rows.',
    'components.form.textarea.api.cols.desc': 'Initial columns.',
    'components.form.textarea.api.placeholder.desc': 'Helper text.',
    'components.form.textarea.api.autoResize.desc':
      'Automatically adjusts height to content.',
    'components.form.textarea.api.maxlength.desc': 'Character limit.',
    'components.form.textarea.api.showCounter.desc':
      'Shows current / max counter.',
    'components.form.textarea.api.disabled.desc': 'Disables the textarea.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
