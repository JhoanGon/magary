import { DemoLanguage } from '../../../types';

export const DATA_NAV_TEXT = {
  es: {
    Data: 'Datos',
    Table: 'Tabla',
    DataView: 'Vista de datos',
    Paginator: 'Paginador',
    Tree: 'Arbol',
    Timeline: 'Linea de tiempo',
    'Organization Chart': 'Organigrama',
    PickList: 'Lista de seleccion',
    OrderList: 'Lista ordenable',
  },
  en: {
    Data: 'Data',
    Table: 'Table',
    DataView: 'Data View',
    Paginator: 'Paginator',
    Tree: 'Tree',
    Timeline: 'Timeline',
    'Organization Chart': 'Organization Chart',
    PickList: 'Pick List',
    OrderList: 'Order List',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
