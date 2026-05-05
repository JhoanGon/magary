import { DemoLanguage } from '../../../../types';

export const TEXTAREA_DOC_TEXT = {
  es: {
    'components.form.textarea.title': 'Magary TextArea',
    'components.form.textarea.subtitle':
      'Area de texto con auto resize y soporte CVA.',
    'components.form.textarea.import.title': 'Importacion',
    'components.form.textarea.import.desc':
      'Importa el componente en tu componente standalone.',
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
    'components.form.textarea.validation.title': 'Contrato de forms canonico',
    'components.form.textarea.validation.desc':
      'Usa Angular Forms como fuente de verdad para touched, invalid, help y error.',
    'components.form.textarea.validation.label': 'Biografia',
    'components.form.textarea.validation.placeholder': 'Cuéntanos sobre tu rol',
    'components.form.textarea.validation.errorMessage': 'La biografia es obligatoria',
    'components.form.textarea.validation.helpText': 'Describe tu rol actual',
    'components.form.textarea.api.title': 'Referencia API',
    'components.form.textarea.api.desc':
      'Inputs públicos alineados con el contrato CVA-first.',
    'components.form.textarea.api.header.name': 'Nombre',
    'components.form.textarea.api.header.type': 'Tipo',
    'components.form.textarea.api.header.default': 'Default',
    'components.form.textarea.api.header.description': 'Descripcion',
    'components.form.textarea.api.inputId.desc':
      'Id estable para el textarea interno y el label asociado.',
    'components.form.textarea.api.ariaLabel.desc':
      'Etiqueta accesible cuando no existe label visible.',
    'components.form.textarea.api.ariaLabelledby.desc':
      'Asocia el textarea con un label externo por id.',
    'components.form.textarea.api.ariaDescribedby.desc':
      'Concatena descripciones accesibles externas con help/error.',
    'components.form.textarea.api.rows.desc': 'Filas iniciales.',
    'components.form.textarea.api.cols.desc': 'Columnas iniciales.',
    'components.form.textarea.api.placeholder.desc': 'Texto de ayuda.',
    'components.form.textarea.api.autoResize.desc':
      'Ajusta automaticamente la altura al contenido.',
    'components.form.textarea.api.maxlength.desc': 'Limite de caracteres.',
    'components.form.textarea.api.showCounter.desc':
      'Muestra el contador current / max.',
    'components.form.textarea.api.disabled.desc': 'Deshabilita el textarea.',
    'components.form.textarea.api.invalid.desc':
      'Permite forzar estado inválido además del detectado desde Angular Forms.',
    'components.form.textarea.api.errorMessage.desc':
      'Mensaje visible cuando el control ya está inválido.',
    'components.form.textarea.api.helpText.desc':
      'Texto de ayuda mostrado mientras no haya error visible.',
  },
  en: {
    'components.form.textarea.title': 'Magary TextArea',
    'components.form.textarea.subtitle':
      'Text area with auto resize and CVA support.',
    'components.form.textarea.import.title': 'Import',
    'components.form.textarea.import.desc':
      'Import the component in your standalone component.',
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
    'components.form.textarea.validation.title': 'Canonical forms contract',
    'components.form.textarea.validation.desc':
      'Use Angular Forms as the source of truth for touched, invalid, help, and error state.',
    'components.form.textarea.validation.label': 'Biography',
    'components.form.textarea.validation.placeholder': 'Tell us about your role',
    'components.form.textarea.validation.errorMessage': 'Biography is required',
    'components.form.textarea.validation.helpText': 'Describe your current role',
    'components.form.textarea.api.title': 'API Reference',
    'components.form.textarea.api.desc':
      'Public inputs aligned with the CVA-first contract.',
    'components.form.textarea.api.header.name': 'Name',
    'components.form.textarea.api.header.type': 'Type',
    'components.form.textarea.api.header.default': 'Default',
    'components.form.textarea.api.header.description': 'Description',
    'components.form.textarea.api.inputId.desc':
      'Stable id for the internal textarea and any linked label.',
    'components.form.textarea.api.ariaLabel.desc':
      'Accessible label when there is no visible label.',
    'components.form.textarea.api.ariaLabelledby.desc':
      'Associates the textarea with an external label by id.',
    'components.form.textarea.api.ariaDescribedby.desc':
      'Merges external accessible descriptions with help/error messaging.',
    'components.form.textarea.api.rows.desc': 'Initial rows.',
    'components.form.textarea.api.cols.desc': 'Initial columns.',
    'components.form.textarea.api.placeholder.desc': 'Helper text.',
    'components.form.textarea.api.autoResize.desc':
      'Automatically adjusts height to content.',
    'components.form.textarea.api.maxlength.desc': 'Character limit.',
    'components.form.textarea.api.showCounter.desc':
      'Shows current / max counter.',
    'components.form.textarea.api.disabled.desc': 'Disables the textarea.',
    'components.form.textarea.api.invalid.desc':
      'Lets you force an invalid state in addition to Angular Forms state.',
    'components.form.textarea.api.errorMessage.desc':
      'Visible message once the control is already invalid.',
    'components.form.textarea.api.helpText.desc':
      'Helper text shown while no visible error is active.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
