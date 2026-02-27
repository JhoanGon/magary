import { DemoLanguage } from '../../../types';
import { CASCADE_SELECT_DOC_TEXT } from './form/cascade-select.docs.translations';
import { CHECKBOX_DOC_TEXT } from './form/checkbox.docs.translations';
import { DATEPICKER_DOC_TEXT } from './form/datepicker.docs.translations';
import { INPUT_DOC_TEXT } from './form/input.docs.translations';
import { INPUT_NUMBER_DOC_TEXT } from './form/input-number.docs.translations';
import { RADIO_DOC_TEXT } from './form/radio.docs.translations';
import { RATING_DOC_TEXT } from './form/rating.docs.translations';
import { SELECT_DOC_TEXT } from './form/select.docs.translations';
import { SEGMENTED_DOC_TEXT } from './form/segmented.docs.translations';
import { SLIDER_DOC_TEXT } from './form/slider.docs.translations';
import { SWITCH_DOC_TEXT } from './form/switch.docs.translations';
import { TEXTAREA_DOC_TEXT } from './form/textarea.docs.translations';

const FORM_DOC_TEXT_ES = {
  ...CASCADE_SELECT_DOC_TEXT.es,
  ...CHECKBOX_DOC_TEXT.es,
  ...DATEPICKER_DOC_TEXT.es,
  ...INPUT_DOC_TEXT.es,
  ...INPUT_NUMBER_DOC_TEXT.es,
  ...RADIO_DOC_TEXT.es,
  ...RATING_DOC_TEXT.es,
  ...SELECT_DOC_TEXT.es,
  ...SEGMENTED_DOC_TEXT.es,
  ...SLIDER_DOC_TEXT.es,
  ...SWITCH_DOC_TEXT.es,
  ...TEXTAREA_DOC_TEXT.es,
};

const FORM_DOC_TEXT_EN = {
  ...CASCADE_SELECT_DOC_TEXT.en,
  ...CHECKBOX_DOC_TEXT.en,
  ...DATEPICKER_DOC_TEXT.en,
  ...INPUT_DOC_TEXT.en,
  ...INPUT_NUMBER_DOC_TEXT.en,
  ...RADIO_DOC_TEXT.en,
  ...RATING_DOC_TEXT.en,
  ...SELECT_DOC_TEXT.en,
  ...SEGMENTED_DOC_TEXT.en,
  ...SLIDER_DOC_TEXT.en,
  ...SWITCH_DOC_TEXT.en,
  ...TEXTAREA_DOC_TEXT.en,
};

export const FORM_DOC_TEXT = {
  es: FORM_DOC_TEXT_ES,
  en: FORM_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type FormDocsTextKey = keyof (typeof FORM_DOC_TEXT)['en'];
