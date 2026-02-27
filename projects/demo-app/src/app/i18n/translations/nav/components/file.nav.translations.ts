import { DemoLanguage } from '../../../types';

export const FILE_NAV_TEXT = {
  es: {
    File: 'Archivos',
    Upload: 'Subir',
    Premium: 'Premium',
  },
  en: {
    File: 'File',
    Upload: 'Upload',
    Premium: 'Premium',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
