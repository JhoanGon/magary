import { DemoLanguage } from '../../../types';
import { CONFIRM_DIALOG_DOC_TEXT } from './overlay/confirm-dialog.docs.translations';
import { DIALOG_DOC_TEXT } from './overlay/dialog.docs.translations';
import { OVERLAY_PANEL_DOC_TEXT } from './overlay/overlaypanel.docs.translations';
import { TOOLTIP_DOC_TEXT } from './overlay/tooltip.docs.translations';

const OVERLAY_DOC_TEXT_ES = {
  ...DIALOG_DOC_TEXT.es,
  ...TOOLTIP_DOC_TEXT.es,
  ...CONFIRM_DIALOG_DOC_TEXT.es,
  ...OVERLAY_PANEL_DOC_TEXT.es,
};

const OVERLAY_DOC_TEXT_EN = {
  ...DIALOG_DOC_TEXT.en,
  ...TOOLTIP_DOC_TEXT.en,
  ...CONFIRM_DIALOG_DOC_TEXT.en,
  ...OVERLAY_PANEL_DOC_TEXT.en,
};

export const OVERLAY_DOC_TEXT = {
  es: OVERLAY_DOC_TEXT_ES,
  en: OVERLAY_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type OverlayDocsTextKey = keyof (typeof OVERLAY_DOC_TEXT)['en'];
