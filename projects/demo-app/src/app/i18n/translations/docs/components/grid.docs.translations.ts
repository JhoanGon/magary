import { DemoLanguage } from '../../../types';
import { GRID_DOC_TEXT } from './grid/grid.docs.translations';

const GRID_DOC_TEXT_ES = {
  ...GRID_DOC_TEXT.es,
};

const GRID_DOC_TEXT_EN = {
  ...GRID_DOC_TEXT.en,
};

export const GRID_CATEGORY_DOC_TEXT = {
  es: GRID_DOC_TEXT_ES,
  en: GRID_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type GridDocsTextKey = keyof (typeof GRID_CATEGORY_DOC_TEXT)['en'];
