import { DemoLanguage } from '../../../types';
import { MESSAGE_DOC_TEXT } from './messages/message.docs.translations';
import { TOAST_DOC_TEXT } from './messages/toast.docs.translations';

const MESSAGES_DOC_TEXT_ES = {
  ...MESSAGE_DOC_TEXT.es,
  ...TOAST_DOC_TEXT.es,
};

const MESSAGES_DOC_TEXT_EN = {
  ...MESSAGE_DOC_TEXT.en,
  ...TOAST_DOC_TEXT.en,
};

export const MESSAGES_DOC_TEXT = {
  es: MESSAGES_DOC_TEXT_ES,
  en: MESSAGES_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type MessagesDocsTextKey = keyof (typeof MESSAGES_DOC_TEXT)['en'];
