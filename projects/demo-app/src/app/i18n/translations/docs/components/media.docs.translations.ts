import { DemoLanguage } from '../../../types';
import { CAROUSEL_DOC_TEXT } from './media/carousel.docs.translations';
import { GALLERIA_DOC_TEXT } from './media/galleria.docs.translations';
import { IMAGE_DOC_TEXT } from './media/image.docs.translations';

const MEDIA_DOC_TEXT_ES = {
  ...IMAGE_DOC_TEXT.es,
  ...GALLERIA_DOC_TEXT.es,
  ...CAROUSEL_DOC_TEXT.es,
};

const MEDIA_DOC_TEXT_EN = {
  ...IMAGE_DOC_TEXT.en,
  ...GALLERIA_DOC_TEXT.en,
  ...CAROUSEL_DOC_TEXT.en,
};

export const MEDIA_DOC_TEXT = {
  es: MEDIA_DOC_TEXT_ES,
  en: MEDIA_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type MediaDocsTextKey = keyof (typeof MEDIA_DOC_TEXT)['en'];
