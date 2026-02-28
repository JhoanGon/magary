import { DemoLanguage } from '../../../types';
import { DATAVIEW_DOC_TEXT } from './data/dataview.docs.translations';
import { ORDER_LIST_DOC_TEXT } from './data/order-list.docs.translations';
import { ORGANIZATION_CHART_DOC_TEXT } from './data/organization-chart.docs.translations';
import { PAGINATOR_DOC_TEXT } from './data/paginator.docs.translations';
import { PICK_LIST_DOC_TEXT } from './data/pick-list.docs.translations';
import { TABLE_DOC_TEXT } from './data/table.docs.translations';
import { TIMELINE_DOC_TEXT } from './data/timeline.docs.translations';
import { TREE_DOC_TEXT } from './data/tree.docs.translations';

const DATA_DOC_TEXT_ES = {
  ...TABLE_DOC_TEXT.es,
  ...PAGINATOR_DOC_TEXT.es,
  ...TREE_DOC_TEXT.es,
  ...TIMELINE_DOC_TEXT.es,
  ...ORGANIZATION_CHART_DOC_TEXT.es,
  ...PICK_LIST_DOC_TEXT.es,
  ...DATAVIEW_DOC_TEXT.es,
  ...ORDER_LIST_DOC_TEXT.es,
};

const DATA_DOC_TEXT_EN = {
  ...TABLE_DOC_TEXT.en,
  ...PAGINATOR_DOC_TEXT.en,
  ...TREE_DOC_TEXT.en,
  ...TIMELINE_DOC_TEXT.en,
  ...ORGANIZATION_CHART_DOC_TEXT.en,
  ...PICK_LIST_DOC_TEXT.en,
  ...DATAVIEW_DOC_TEXT.en,
  ...ORDER_LIST_DOC_TEXT.en,
};

export const DATA_DOC_TEXT = {
  es: DATA_DOC_TEXT_ES,
  en: DATA_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type DataDocsTextKey = keyof (typeof DATA_DOC_TEXT)['en'];
