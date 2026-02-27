import { DemoLanguage } from '../../../types';

export const MESSAGES_NAV_TEXT = {
  es: {
    Messages: 'Mensajes',
    Message: 'Mensaje',
    Toast: 'Toast',
  },
  en: {
    Messages: 'Messages',
    Message: 'Message',
    Toast: 'Toast',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
