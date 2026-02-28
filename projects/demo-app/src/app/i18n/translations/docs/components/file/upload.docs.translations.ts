import { DemoLanguage } from '../../../../types';

export const UPLOAD_DOC_TEXT = {
  es: {
    'components.file.upload.title': 'MagaryUpload',
    'components.file.upload.subtitle':
      'Componente avanzado de carga de archivos con soporte drag and drop, carga multiple y validaciones.',
    'components.file.upload.import.title': 'Import',
    'components.file.upload.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.file.upload.basic.title': 'Ejemplo Basico',
    'components.file.upload.basic.desc':
      'Uso simple con boton de seleccion.',
    'components.file.upload.basic.cardTitle': 'Basic',
    'components.file.upload.basic.chooseLabel': 'Seleccionar Archivo',
    'components.file.upload.advanced.title': 'Ejemplo Avanzado',
    'components.file.upload.advanced.desc':
      'Drag and drop, multiples archivos y validaciones.',
    'components.file.upload.advanced.cardTitle': 'Advanced',
    'components.file.upload.manual.title': 'Carga Manual',
    'components.file.upload.manual.desc':
      'Control total sobre el proceso de carga usando eventos.',
    'components.file.upload.apiInputs.title': 'Propiedades (Inputs)',
    'components.file.upload.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.file.upload.apiInputs.header.name': 'Nombre',
    'components.file.upload.apiInputs.header.type': 'Tipo',
    'components.file.upload.apiInputs.header.default': 'Valor por defecto',
    'components.file.upload.apiInputs.header.description': 'Descripcion',
    'components.file.upload.apiInputs.mode.desc':
      'Modo de visualizacion del componente.',
    'components.file.upload.apiInputs.multiple.desc':
      'Permite seleccionar multiples archivos.',
    'components.file.upload.apiInputs.accept.desc':
      'Tipos de archivo permitidos (ej: image/*).',
    'components.file.upload.apiInputs.maxFileSize.desc':
      'Tamano maximo de archivo en bytes.',
    'components.file.upload.apiInputs.url.desc':
      'URL del endpoint de carga (opcional).',
    'components.file.upload.apiInputs.name.desc':
      'Nombre del campo en el FormData.',
    'components.file.upload.apiInputs.withCredentials.desc':
      'Envia cookies y headers de autenticacion.',
    'components.file.upload.apiInputs.chooseLabel.desc':
      'Texto del boton de seleccion.',
    'components.file.upload.apiInputs.uploadLabel.desc':
      'Texto del boton de carga (modo avanzado).',
    'components.file.upload.apiInputs.cancelLabel.desc':
      'Texto del boton de cancelar (modo avanzado).',
    'components.file.upload.apiOutputs.title': 'Eventos (Outputs)',
    'components.file.upload.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.file.upload.apiOutputs.header.name': 'Nombre',
    'components.file.upload.apiOutputs.header.type': 'Tipo',
    'components.file.upload.apiOutputs.header.description': 'Descripcion',
    'components.file.upload.apiOutputs.onSelect.desc':
      'Se emite cuando se seleccionan archivos.',
    'components.file.upload.apiOutputs.onUpload.desc':
      'Se emite cuando la carga se completa exitosamente.',
    'components.file.upload.apiOutputs.onError.desc':
      'Se emite cuando ocurre un error (ej: tamano excedido).',
    'components.file.upload.apiOutputs.onClear.desc':
      'Se emite cuando se limpia la lista de archivos.',
    'components.file.upload.toast.select.title': 'Info',
    'components.file.upload.toast.select.message': 'Archivo seleccionado',
    'components.file.upload.toast.upload.title': 'Exito',
    'components.file.upload.toast.upload.message': 'Archivo cargado',
    'components.file.upload.toast.error.title': 'Error',
  },
  en: {
    'components.file.upload.title': 'MagaryUpload',
    'components.file.upload.subtitle':
      'Advanced file upload component with drag and drop, multi-file support, and validations.',
    'components.file.upload.import.title': 'Import',
    'components.file.upload.import.desc':
      'Import the component in your module or standalone component.',
    'components.file.upload.basic.title': 'Basic Example',
    'components.file.upload.basic.desc':
      'Simple usage with file selection button.',
    'components.file.upload.basic.cardTitle': 'Basic',
    'components.file.upload.basic.chooseLabel': 'Select File',
    'components.file.upload.advanced.title': 'Advanced Example',
    'components.file.upload.advanced.desc':
      'Drag and drop, multiple files, and validations.',
    'components.file.upload.advanced.cardTitle': 'Advanced',
    'components.file.upload.manual.title': 'Manual Upload',
    'components.file.upload.manual.desc':
      'Full control over upload flow using events.',
    'components.file.upload.apiInputs.title': 'Properties (Inputs)',
    'components.file.upload.apiInputs.desc':
      'All available properties for this component.',
    'components.file.upload.apiInputs.header.name': 'Name',
    'components.file.upload.apiInputs.header.type': 'Type',
    'components.file.upload.apiInputs.header.default': 'Default',
    'components.file.upload.apiInputs.header.description': 'Description',
    'components.file.upload.apiInputs.mode.desc':
      'Component rendering mode.',
    'components.file.upload.apiInputs.multiple.desc':
      'Allows selecting multiple files.',
    'components.file.upload.apiInputs.accept.desc':
      'Accepted file types (e.g. image/*).',
    'components.file.upload.apiInputs.maxFileSize.desc':
      'Maximum file size in bytes.',
    'components.file.upload.apiInputs.url.desc':
      'Upload endpoint URL (optional).',
    'components.file.upload.apiInputs.name.desc':
      'Field name used in FormData.',
    'components.file.upload.apiInputs.withCredentials.desc':
      'Sends cookies and auth headers.',
    'components.file.upload.apiInputs.chooseLabel.desc':
      'Choose button text.',
    'components.file.upload.apiInputs.uploadLabel.desc':
      'Upload button text (advanced mode).',
    'components.file.upload.apiInputs.cancelLabel.desc':
      'Cancel button text (advanced mode).',
    'components.file.upload.apiOutputs.title': 'Events (Outputs)',
    'components.file.upload.apiOutputs.desc':
      'Events emitted by the component.',
    'components.file.upload.apiOutputs.header.name': 'Name',
    'components.file.upload.apiOutputs.header.type': 'Type',
    'components.file.upload.apiOutputs.header.description': 'Description',
    'components.file.upload.apiOutputs.onSelect.desc':
      'Emitted when files are selected.',
    'components.file.upload.apiOutputs.onUpload.desc':
      'Emitted when upload completes successfully.',
    'components.file.upload.apiOutputs.onError.desc':
      'Emitted when an error occurs (e.g. file too large).',
    'components.file.upload.apiOutputs.onClear.desc':
      'Emitted when selected files are cleared.',
    'components.file.upload.toast.select.title': 'Info',
    'components.file.upload.toast.select.message': 'File selected',
    'components.file.upload.toast.upload.title': 'Success',
    'components.file.upload.toast.upload.message': 'File uploaded',
    'components.file.upload.toast.error.title': 'Error',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
