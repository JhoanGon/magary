import { DemoLanguage } from '../../types';
import { FORM_DOC_TEXT, FormDocsTextKey } from './components/form.docs.translations';

const COMPONENTS_DOC_TEXT_ES = {
  ...FORM_DOC_TEXT.es,
};

const COMPONENTS_DOC_TEXT_EN = {
  ...FORM_DOC_TEXT.en,
};

export const COMPONENTS_DOC_TEXT = {
  es: COMPONENTS_DOC_TEXT_ES,
  en: COMPONENTS_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type ComponentsDocsTextKey = FormDocsTextKey;
