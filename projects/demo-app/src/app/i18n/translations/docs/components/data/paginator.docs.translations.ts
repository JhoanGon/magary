import { DemoLanguage } from '../../../../types';

export const PAGINATOR_DOC_TEXT = {
  es: {
    'components.data.paginator.title': 'MagaryPaginator',
    'components.data.paginator.subtitle':
      'Componente generico para visualizar contenido en formato paginado.',
    'components.data.paginator.basic.title': 'Ejemplo Basico',
    'components.data.paginator.basic.desc':
      'Paginador simple con control de filas por pagina.',
    'components.data.paginator.customPage.title':
      'Tamano de Pagina Personalizado',
    'components.data.paginator.customPage.desc':
      'Ejemplo con tamano de pagina de 5 items.',
    'components.data.paginator.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.paginator.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.data.paginator.apiInputs.header.name': 'Nombre',
    'components.data.paginator.apiInputs.header.type': 'Tipo',
    'components.data.paginator.apiInputs.header.default': 'Valor por defecto',
    'components.data.paginator.apiInputs.header.description': 'Descripcion',
    'components.data.paginator.apiInputs.totalRecords.desc':
      'Total de registros a paginar.',
    'components.data.paginator.apiInputs.rows.desc':
      'Numero de filas a mostrar por pagina.',
    'components.data.paginator.apiInputs.first.desc':
      'Indice del primer registro a mostrar.',
    'components.data.paginator.apiInputs.rowsPerPageOptions.desc':
      'Opciones para el selector de filas por pagina.',
    'components.data.paginator.apiInputs.pageLinkSize.desc':
      'Numero de enlaces a paginas visibles.',
    'components.data.paginator.apiInputs.showPageLinks.desc':
      'Define si se muestran los enlaces de pagina.',
    'components.data.paginator.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.paginator.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.data.paginator.apiOutputs.header.name': 'Nombre',
    'components.data.paginator.apiOutputs.header.type': 'Tipo',
    'components.data.paginator.apiOutputs.header.description': 'Descripcion',
    'components.data.paginator.apiOutputs.onPageChange.desc':
      'Callback que se invoca cuando cambia la pagina.',
  },
  en: {
    'components.data.paginator.title': 'MagaryPaginator',
    'components.data.paginator.subtitle':
      'Generic component to render content in a paginated format.',
    'components.data.paginator.basic.title': 'Basic Example',
    'components.data.paginator.basic.desc':
      'Simple paginator with rows-per-page control.',
    'components.data.paginator.customPage.title': 'Custom Page Size',
    'components.data.paginator.customPage.desc':
      'Example with 5 items per page.',
    'components.data.paginator.apiInputs.title': 'Properties (Inputs)',
    'components.data.paginator.apiInputs.desc':
      'All available properties for this component.',
    'components.data.paginator.apiInputs.header.name': 'Name',
    'components.data.paginator.apiInputs.header.type': 'Type',
    'components.data.paginator.apiInputs.header.default': 'Default',
    'components.data.paginator.apiInputs.header.description': 'Description',
    'components.data.paginator.apiInputs.totalRecords.desc':
      'Total records to paginate.',
    'components.data.paginator.apiInputs.rows.desc': 'Rows displayed per page.',
    'components.data.paginator.apiInputs.first.desc':
      'Index of the first record to display.',
    'components.data.paginator.apiInputs.rowsPerPageOptions.desc':
      'Options for the rows-per-page selector.',
    'components.data.paginator.apiInputs.pageLinkSize.desc':
      'Number of visible page links.',
    'components.data.paginator.apiInputs.showPageLinks.desc':
      'Defines whether page links are shown.',
    'components.data.paginator.apiOutputs.title': 'Events (Outputs)',
    'components.data.paginator.apiOutputs.desc':
      'Events emitted by the component.',
    'components.data.paginator.apiOutputs.header.name': 'Name',
    'components.data.paginator.apiOutputs.header.type': 'Type',
    'components.data.paginator.apiOutputs.header.description': 'Description',
    'components.data.paginator.apiOutputs.onPageChange.desc':
      'Callback fired when page changes.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
