import { DemoLanguage } from '../../../types';
import { ACCORDION_DOC_TEXT } from './panel/accordion.docs.translations';
import { CARD_DOC_TEXT } from './panel/card.docs.translations';
import { FIELDSET_DOC_TEXT } from './panel/fieldset.docs.translations';
import { TAB_DOC_TEXT } from './panel/tab.docs.translations';
import { TOOLBAR_DOC_TEXT } from './panel/toolbar.docs.translations';

const PANEL_DOC_TEXT_ES = {
  ...CARD_DOC_TEXT.es,
  ...FIELDSET_DOC_TEXT.es,
  ...TOOLBAR_DOC_TEXT.es,
  ...TAB_DOC_TEXT.es,
  ...ACCORDION_DOC_TEXT.es,
};

const PANEL_DOC_TEXT_EN = {
  ...CARD_DOC_TEXT.en,
  ...FIELDSET_DOC_TEXT.en,
  ...TOOLBAR_DOC_TEXT.en,
  ...TAB_DOC_TEXT.en,
  ...ACCORDION_DOC_TEXT.en,
};

export const PANEL_DOC_TEXT = {
  es: PANEL_DOC_TEXT_ES,
  en: PANEL_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type PanelDocsTextKey = keyof (typeof PANEL_DOC_TEXT)['en'];
