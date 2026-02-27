import { DemoLanguage } from '../../types';
import { ICONS_DOC_TEXT } from './utilities/icons.docs.translations';
import { THEMING_DOC_TEXT } from './utilities/theming.docs.translations';

const UTILITIES_DOC_TEXT_ES = {
  ...THEMING_DOC_TEXT.es,
  ...ICONS_DOC_TEXT.es,
};

const UTILITIES_DOC_TEXT_EN = {
  ...THEMING_DOC_TEXT.en,
  ...ICONS_DOC_TEXT.en,
};

export const UTILITIES_DOC_TEXT = {
  es: UTILITIES_DOC_TEXT_ES,
  en: UTILITIES_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type UtilitiesDocsTextKey = keyof (typeof UTILITIES_DOC_TEXT)['en'];
