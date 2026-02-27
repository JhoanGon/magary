import { DemoLanguage } from '../../types';
import { INSTALLATION_DOC_TEXT } from './getting-started/installation.docs.translations';
import { MCP_DOC_TEXT } from './getting-started/mcp.docs.translations';
import { SETUP_DOC_TEXT } from './getting-started/setup.docs.translations';

const GETTING_STARTED_DOC_TEXT_ES = {
  ...INSTALLATION_DOC_TEXT.es,
  ...SETUP_DOC_TEXT.es,
  ...MCP_DOC_TEXT.es,
};

const GETTING_STARTED_DOC_TEXT_EN = {
  ...INSTALLATION_DOC_TEXT.en,
  ...SETUP_DOC_TEXT.en,
  ...MCP_DOC_TEXT.en,
};

export const GETTING_STARTED_DOC_TEXT = {
  es: GETTING_STARTED_DOC_TEXT_ES,
  en: GETTING_STARTED_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type GettingStartedDocsTextKey =
  keyof (typeof GETTING_STARTED_DOC_TEXT)['en'];
