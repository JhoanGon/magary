import { DemoLanguage } from '../../../types';

export const OVERLAY_NAV_TEXT = {
  es: {
    Overlay: 'Superposicion',
    Dialog: 'Dialogo',
    Tooltip: 'Ayuda emergente',
    ConfirmDialog: 'Dialogo de confirmacion',
    OverlayPanel: 'Panel flotante',
  },
  en: {
    Overlay: 'Overlay',
    Dialog: 'Dialog',
    Tooltip: 'Tooltip',
    ConfirmDialog: 'Confirm Dialog',
    OverlayPanel: 'Overlay Panel',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
