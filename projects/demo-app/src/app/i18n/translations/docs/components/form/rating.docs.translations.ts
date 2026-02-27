import { DemoLanguage } from '../../../../types';

export const RATING_DOC_TEXT = {
  es: {
    'components.form.rating.title': 'Magary Rating',
    'components.form.rating.subtitle': 'Componente de calificacion con estrellas.',
    'components.form.rating.import.title': 'Importacion',
    'components.form.rating.basic.title': 'Basico',
    'components.form.rating.basic.desc':
      'Configuracion por defecto con 5 estrellas y opcion de cancelar.',
    'components.form.rating.basic.valueLabel': 'Valor',
    'components.form.rating.noCancel.title': 'Sin cancelar',
    'components.form.rating.noCancel.desc':
      'Deshabilita la opcion de cancelar la seleccion.',
    'components.form.rating.readonly.title': 'Solo lectura',
    'components.form.rating.readonly.desc':
      'Modo de visualizacion sin interaccion.',
    'components.form.rating.customStars.title': 'Estrellas personalizadas',
    'components.form.rating.customStars.desc':
      'Define el numero de estrellas con la propiedad stars.',
    'components.form.rating.api.title': 'Propiedades (Inputs)',
    'components.form.rating.api.header.name': 'Nombre',
    'components.form.rating.api.header.type': 'Tipo',
    'components.form.rating.api.header.default': 'Por defecto',
    'components.form.rating.api.header.description': 'Descripcion',
    'components.form.rating.api.stars.desc': 'Numero de estrellas.',
    'components.form.rating.api.cancel.desc': 'Muestra el icono de cancelar.',
    'components.form.rating.api.disabled.desc': 'Deshabilita el componente.',
    'components.form.rating.api.readonly.desc': 'Modo solo lectura.',
  },
  en: {
    'components.form.rating.title': 'Magary Rating',
    'components.form.rating.subtitle': 'Star rating component.',
    'components.form.rating.import.title': 'Import',
    'components.form.rating.basic.title': 'Basic',
    'components.form.rating.basic.desc':
      'Default setup with 5 stars and cancel support.',
    'components.form.rating.basic.valueLabel': 'Value',
    'components.form.rating.noCancel.title': 'No Cancel',
    'components.form.rating.noCancel.desc':
      'Disables the option to clear the selection.',
    'components.form.rating.readonly.title': 'Read Only',
    'components.form.rating.readonly.desc': 'Display mode without interaction.',
    'components.form.rating.customStars.title': 'Custom Stars',
    'components.form.rating.customStars.desc':
      'Defines the star count with the stars property.',
    'components.form.rating.api.title': 'Properties (Inputs)',
    'components.form.rating.api.header.name': 'Name',
    'components.form.rating.api.header.type': 'Type',
    'components.form.rating.api.header.default': 'Default',
    'components.form.rating.api.header.description': 'Description',
    'components.form.rating.api.stars.desc': 'Number of stars.',
    'components.form.rating.api.cancel.desc': 'Shows cancel icon.',
    'components.form.rating.api.disabled.desc': 'Disables the component.',
    'components.form.rating.api.readonly.desc': 'Read-only mode.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
