import { DemoLanguage } from '../types';
import {
  GETTING_STARTED_DOC_TEXT,
  GettingStartedDocsTextKey,
} from './docs/getting-started.docs.translations';
import {
  COMPONENTS_DOC_TEXT,
  ComponentsDocsTextKey,
} from './docs/components.docs.translations';
import {
  UTILITIES_DOC_TEXT,
  UtilitiesDocsTextKey,
} from './docs/utilities.docs.translations';

const DOC_TEXT_ES = {
  ...GETTING_STARTED_DOC_TEXT.es,
  ...COMPONENTS_DOC_TEXT.es,
  ...UTILITIES_DOC_TEXT.es,
};

const DOC_TEXT_EN = {
  ...GETTING_STARTED_DOC_TEXT.en,
  ...COMPONENTS_DOC_TEXT.en,
  ...UTILITIES_DOC_TEXT.en,
};

export const DOC_TEXT = {
  es: DOC_TEXT_ES,
  en: DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type DocsTextKey =
  | GettingStartedDocsTextKey
  | ComponentsDocsTextKey
  | UtilitiesDocsTextKey;
