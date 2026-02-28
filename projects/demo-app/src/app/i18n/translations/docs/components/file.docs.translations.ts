import { DemoLanguage } from '../../../types';
import { UPLOAD_DOC_TEXT } from './file/upload.docs.translations';

const FILE_DOC_TEXT_ES = {
  ...UPLOAD_DOC_TEXT.es,
};

const FILE_DOC_TEXT_EN = {
  ...UPLOAD_DOC_TEXT.en,
};

export const FILE_DOC_TEXT = {
  es: FILE_DOC_TEXT_ES,
  en: FILE_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type FileDocsTextKey = keyof (typeof FILE_DOC_TEXT)['en'];
