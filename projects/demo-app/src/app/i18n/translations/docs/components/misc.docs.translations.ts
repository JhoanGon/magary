import { DemoLanguage } from '../../../types';
import { AVATAR_DOC_TEXT } from './misc/avatar.docs.translations';
import { DIVIDER_DOC_TEXT } from './misc/divider.docs.translations';
import { SKELETON_DOC_TEXT } from './misc/skeleton.docs.translations';
import { TAG_DOC_TEXT } from './misc/tag.docs.translations';

const MISC_DOC_TEXT_ES = {
  ...AVATAR_DOC_TEXT.es,
  ...SKELETON_DOC_TEXT.es,
  ...DIVIDER_DOC_TEXT.es,
  ...TAG_DOC_TEXT.es,
};

const MISC_DOC_TEXT_EN = {
  ...AVATAR_DOC_TEXT.en,
  ...SKELETON_DOC_TEXT.en,
  ...DIVIDER_DOC_TEXT.en,
  ...TAG_DOC_TEXT.en,
};

export const MISC_DOC_TEXT = {
  es: MISC_DOC_TEXT_ES,
  en: MISC_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type MiscDocsTextKey = keyof (typeof MISC_DOC_TEXT)['en'];
