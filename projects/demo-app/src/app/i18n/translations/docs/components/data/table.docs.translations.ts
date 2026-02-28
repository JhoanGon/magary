import { DemoLanguage } from '../../../../types';

export const TABLE_DOC_TEXT = {
  es: {
    'components.data.table.title': 'MagaryTable',
    'components.data.table.subtitle':
      'Componente de tabla con paginacion, filtrado y columnas personalizables.',
    'components.data.table.import.title': 'Import',
    'components.data.table.import.desc':
      'Importa el componente en tu modulo o componente standalone.',
    'components.data.table.basic.title': 'Ejemplo Basico',
    'components.data.table.basic.desc':
      'Tabla simple con datos y columnas definidas.',
    'components.data.table.paginatorFixed.title':
      'Paginacion y Filtrado con diseno fijo',
    'components.data.table.paginatorFixed.desc':
      'Tabla completa con paginacion, busqueda global y titulo.',
    'components.data.table.templateGuidelines.title':
      'Guia Visual Para Templates',
    'components.data.table.templateGuidelines.intro':
      'Para mantener el mismo look de magary-table cuando usas ng-template, conserva estas clases:',
    'components.data.table.templateGuidelines.item.row':
      'table-row en cada fila custom.',
    'components.data.table.templateGuidelines.item.cell':
      'table-cell-value para contenido dentro de celdas.',
    'components.data.table.templateGuidelines.item.layout':
      'Clases de layout especificas como inline-edit-price-cell y inline-edit-actions-cell para anchos de columnas.',
    'components.data.table.paginatorResponsive.title':
      'Paginacion y Filtrado con diseno responsivo',
    'components.data.table.paginatorResponsive.desc':
      'Tabla completa con paginacion, busqueda global y titulo.',
    'components.data.table.fixed.title': 'Diseno Fijo',
    'components.data.table.fixed.desc':
      'Tabla con altura fija y scroll interno (responsiveLayout="false").',
    'components.data.table.loading.title': 'Estado de Carga',
    'components.data.table.loading.desc':
      'Muestra un estado de carga cuando no hay datos disponibles.',
    'components.data.table.templates.title': 'Templates e Inline Editing',
    'components.data.table.templates.desc':
      'Uso de ng-template para personalizar celdas y filas.',
    'components.data.table.templates.header.name': 'Name',
    'components.data.table.templates.header.priceEdit': 'Price (Edit)',
    'components.data.table.templates.header.actions': 'Actions',
    'components.data.table.templates.input.editPriceFor':
      'Editar precio de ',
    'components.data.table.enterprise.title': 'Enterprise Recipe',
    'components.data.table.enterprise.desc':
      'Configuracion orientada a produccion con eventos estables de paginacion y ordenamiento.',
    'components.data.table.enterprise.lastPageLabel':
      'Ultimo evento de pagina:',
    'components.data.table.enterprise.lastSortLabel':
      'Ultimo evento de orden:',
    'components.data.table.enterprise.pageEvent.none':
      'Sin evento de pagina',
    'components.data.table.enterprise.sortEvent.none':
      'Sin evento de orden',
    'components.data.table.enterprise.pageEvent.pageLabel': 'Pagina',
    'components.data.table.enterprise.pageEvent.firstLabel': 'first',
    'components.data.table.enterprise.pageEvent.rowsLabel': 'rows',
    'components.data.table.enterprise.sortEvent.fieldLabel': 'Campo',
    'components.data.table.enterprise.sortEvent.orderLabel': 'orden',
    'components.data.table.enterprise.sortEvent.noneField': 'ninguno',
    'components.data.table.demoTitle.productsList': 'Lista de Productos',
    'components.data.table.demoTitle.fixedHeightTable':
      'Tabla de Altura Fija',
    'components.data.table.demoTitle.loadingState': 'Estado de Carga',
    'components.data.table.demoTitle.inventoryControl':
      'Control de Inventario',
    'components.data.table.apiInputs.title': 'Propiedades (Inputs)',
    'components.data.table.apiInputs.desc':
      'Todas las propiedades disponibles del componente.',
    'components.data.table.apiInputs.header.name': 'Nombre',
    'components.data.table.apiInputs.header.type': 'Tipo',
    'components.data.table.apiInputs.header.default': 'Valor por defecto',
    'components.data.table.apiInputs.header.description': 'Descripcion',
    'components.data.table.apiInputs.value.desc':
      'Array de objetos a mostrar.',
    'components.data.table.apiInputs.columns.desc':
      'Configuracion de columnas.',
    'components.data.table.apiInputs.columnsSortable.desc':
      'Habilita orden ascendente/descendente por click en el encabezado.',
    'components.data.table.apiInputs.paginator.desc':
      'Habilita la paginacion.',
    'components.data.table.apiInputs.rows.desc':
      'Numero de filas por pagina.',
    'components.data.table.apiInputs.globalFilterFields.desc':
      'Campos para la busqueda global.',
    'components.data.table.apiInputs.titleInput.desc':
      'Titulo de la tabla.',
    'components.data.table.apiInputs.responsiveLayout.desc':
      'Define si la tabla adapta su altura al contenido (true) o usa altura fija con scroll (false).',
    'components.data.table.apiInputs.loading.desc':
      'Muestra estado de carga (skeleton/spinner).',
    'components.data.table.apiOutputs.title': 'Eventos (Outputs)',
    'components.data.table.apiOutputs.desc':
      'Eventos emitidos por el componente.',
    'components.data.table.apiOutputs.header.name': 'Nombre',
    'components.data.table.apiOutputs.header.type': 'Tipo',
    'components.data.table.apiOutputs.header.description': 'Descripcion',
    'components.data.table.apiOutputs.onPageChange.desc':
      'Se emite al cambiar de pagina. Retorna un objeto con first, rows, page y pageCount.',
    'components.data.table.apiOutputs.onSortChange.desc':
      'Se emite al cambiar el orden. Retorna field y order (1, -1, 0).',
  },
  en: {
    'components.data.table.title': 'MagaryTable',
    'components.data.table.subtitle':
      'Data table component with pagination, filtering, and customizable columns.',
    'components.data.table.import.title': 'Import',
    'components.data.table.import.desc':
      'Import the component in your module or standalone component.',
    'components.data.table.basic.title': 'Basic Example',
    'components.data.table.basic.desc':
      'Simple table with defined data and columns.',
    'components.data.table.paginatorFixed.title':
      'Pagination and Filtering with Fixed Layout',
    'components.data.table.paginatorFixed.desc':
      'Full table with pagination, global search, and title.',
    'components.data.table.templateGuidelines.title':
      'Template Visual Guidelines',
    'components.data.table.templateGuidelines.intro':
      'To keep the same magary-table visual style when using ng-template, keep these classes:',
    'components.data.table.templateGuidelines.item.row':
      'table-row on each custom row.',
    'components.data.table.templateGuidelines.item.cell':
      'table-cell-value for content inside cells.',
    'components.data.table.templateGuidelines.item.layout':
      'Specific layout classes like inline-edit-price-cell and inline-edit-actions-cell for column widths.',
    'components.data.table.paginatorResponsive.title':
      'Pagination and Filtering with Responsive Layout',
    'components.data.table.paginatorResponsive.desc':
      'Full table with pagination, global search, and title.',
    'components.data.table.fixed.title': 'Fixed Layout',
    'components.data.table.fixed.desc':
      'Table with fixed height and internal scroll (responsiveLayout="false").',
    'components.data.table.loading.title': 'Loading State',
    'components.data.table.loading.desc':
      'Displays a loading state when no data is available.',
    'components.data.table.templates.title': 'Templates and Inline Editing',
    'components.data.table.templates.desc':
      'Use ng-template to customize cells and rows.',
    'components.data.table.templates.header.name': 'Name',
    'components.data.table.templates.header.priceEdit': 'Price (Edit)',
    'components.data.table.templates.header.actions': 'Actions',
    'components.data.table.templates.input.editPriceFor': 'Edit price for ',
    'components.data.table.enterprise.title': 'Enterprise Recipe',
    'components.data.table.enterprise.desc':
      'Production-oriented setup with stable paging and sorting events.',
    'components.data.table.enterprise.lastPageLabel': 'Last page event:',
    'components.data.table.enterprise.lastSortLabel': 'Last sort event:',
    'components.data.table.enterprise.pageEvent.none': 'No page event yet',
    'components.data.table.enterprise.sortEvent.none': 'No sort event yet',
    'components.data.table.enterprise.pageEvent.pageLabel': 'Page',
    'components.data.table.enterprise.pageEvent.firstLabel': 'first',
    'components.data.table.enterprise.pageEvent.rowsLabel': 'rows',
    'components.data.table.enterprise.sortEvent.fieldLabel': 'Field',
    'components.data.table.enterprise.sortEvent.orderLabel': 'order',
    'components.data.table.enterprise.sortEvent.noneField': 'none',
    'components.data.table.demoTitle.productsList': 'Products List',
    'components.data.table.demoTitle.fixedHeightTable': 'Fixed Height Table',
    'components.data.table.demoTitle.loadingState': 'Loading State',
    'components.data.table.demoTitle.inventoryControl': 'Inventory Control',
    'components.data.table.apiInputs.title': 'Properties (Inputs)',
    'components.data.table.apiInputs.desc':
      'All available properties for this component.',
    'components.data.table.apiInputs.header.name': 'Name',
    'components.data.table.apiInputs.header.type': 'Type',
    'components.data.table.apiInputs.header.default': 'Default',
    'components.data.table.apiInputs.header.description': 'Description',
    'components.data.table.apiInputs.value.desc': 'Array of records to render.',
    'components.data.table.apiInputs.columns.desc': 'Column configuration.',
    'components.data.table.apiInputs.columnsSortable.desc':
      'Enables ascending/descending sorting by clicking column headers.',
    'components.data.table.apiInputs.paginator.desc':
      'Enables pagination.',
    'components.data.table.apiInputs.rows.desc': 'Rows per page.',
    'components.data.table.apiInputs.globalFilterFields.desc':
      'Fields used for global search.',
    'components.data.table.apiInputs.titleInput.desc': 'Table title.',
    'components.data.table.apiInputs.responsiveLayout.desc':
      'Defines whether the table adapts height to content (true) or uses fixed-height scroll (false).',
    'components.data.table.apiInputs.loading.desc':
      'Shows loading state (skeleton/spinner).',
    'components.data.table.apiOutputs.title': 'Events (Outputs)',
    'components.data.table.apiOutputs.desc':
      'Events emitted by the component.',
    'components.data.table.apiOutputs.header.name': 'Name',
    'components.data.table.apiOutputs.header.type': 'Type',
    'components.data.table.apiOutputs.header.description': 'Description',
    'components.data.table.apiOutputs.onPageChange.desc':
      'Emitted on page change. Returns an object with first, rows, page, and pageCount.',
    'components.data.table.apiOutputs.onSortChange.desc':
      'Emitted on sort change. Returns field and order (1, -1, 0).',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
