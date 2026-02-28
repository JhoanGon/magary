import { DemoLanguage } from '../../../../types';

export const DATAVIEW_DOC_TEXT = {
  es: {
    'components.data.dataview.title': 'DataView',
    'components.data.dataview.subtitle':
      'DataView muestra datos en formato de cuadricula o lista con paginacion y personalizacion.',
    'components.data.dataview.import.title': 'Importacion',
    'components.data.dataview.basic.title': 'Ejemplo Basico',
    'components.data.dataview.basic.desc':
      'Ejemplo de DataView con layout conmutable entre lista y cuadricula.',
    'components.data.dataview.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.dataview.apiInputs.header.name': 'Nombre',
    'components.data.dataview.apiInputs.header.type': 'Tipo',
    'components.data.dataview.apiInputs.header.default': 'Predeterminado',
    'components.data.dataview.apiInputs.header.description': 'Descripcion',
    'components.data.dataview.apiInputs.value.desc':
      'Array de objetos a mostrar.',
    'components.data.dataview.apiInputs.layout.desc':
      'Diseno de visualizacion de los datos.',
    'components.data.dataview.apiInputs.paginator.desc':
      'Habilita el paginador.',
    'components.data.dataview.apiInputs.rows.desc':
      'Numero de filas por pagina.',
    'components.data.dataview.apiInputs.emptyMessage.desc':
      'Mensaje a mostrar cuando no hay datos.',
    'components.data.dataview.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.dataview.apiOutputs.header.name': 'Nombre',
    'components.data.dataview.apiOutputs.header.type': 'Tipo',
    'components.data.dataview.apiOutputs.header.description': 'Descripcion',
    'components.data.dataview.apiOutputs.onPage.desc':
      'Callback invocado cuando cambia la pagina.',
  },
  en: {
    'components.data.dataview.title': 'DataView',
    'components.data.dataview.subtitle':
      'DataView displays data in grid or list format with pagination and customization.',
    'components.data.dataview.import.title': 'Import',
    'components.data.dataview.basic.title': 'Basic Example',
    'components.data.dataview.basic.desc':
      'DataView example with switchable list and grid layouts.',
    'components.data.dataview.apiInputs.title': 'Properties (Inputs)',
    'components.data.dataview.apiInputs.header.name': 'Name',
    'components.data.dataview.apiInputs.header.type': 'Type',
    'components.data.dataview.apiInputs.header.default': 'Default',
    'components.data.dataview.apiInputs.header.description': 'Description',
    'components.data.dataview.apiInputs.value.desc':
      'Array of objects to render.',
    'components.data.dataview.apiInputs.layout.desc':
      'Visual layout used to render data.',
    'components.data.dataview.apiInputs.paginator.desc':
      'Enables paginator.',
    'components.data.dataview.apiInputs.rows.desc': 'Rows per page.',
    'components.data.dataview.apiInputs.emptyMessage.desc':
      'Message shown when there is no data.',
    'components.data.dataview.apiOutputs.title': 'Events (Outputs)',
    'components.data.dataview.apiOutputs.header.name': 'Name',
    'components.data.dataview.apiOutputs.header.type': 'Type',
    'components.data.dataview.apiOutputs.header.description': 'Description',
    'components.data.dataview.apiOutputs.onPage.desc':
      'Callback fired when page changes.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
