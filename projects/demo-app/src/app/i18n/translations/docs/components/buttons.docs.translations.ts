import { DemoLanguage } from '../../../types';
import { BUTTON_DOC_TEXT } from './buttons/button.docs.translations';
import { SPEED_DIAL_DOC_TEXT } from './buttons/speed-dial.docs.translations';
import { SPLIT_BUTTON_DOC_TEXT } from './buttons/split-button.docs.translations';

const BUTTONS_DOC_TEXT_ES = {
  ...BUTTON_DOC_TEXT.es,
  ...SPEED_DIAL_DOC_TEXT.es,
  ...SPLIT_BUTTON_DOC_TEXT.es,
};

const BUTTONS_DOC_TEXT_EN = {
  ...BUTTON_DOC_TEXT.en,
  ...SPEED_DIAL_DOC_TEXT.en,
  ...SPLIT_BUTTON_DOC_TEXT.en,
};

export const BUTTONS_DOC_TEXT = {
  es: BUTTONS_DOC_TEXT_ES,
  en: BUTTONS_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type ButtonsDocsTextKey = keyof (typeof BUTTONS_DOC_TEXT)['en'];
