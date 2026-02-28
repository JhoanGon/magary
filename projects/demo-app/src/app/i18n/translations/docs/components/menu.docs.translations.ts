import { DemoLanguage } from '../../../types';
import { BREADCRUMB_DOC_TEXT } from './menu/breadcrumb.docs.translations';
import { CONTEXT_MENU_DOC_TEXT } from './menu/context-menu.docs.translations';
import { MEGAMENU_DOC_TEXT } from './menu/megamenu.docs.translations';
import { MENUBAR_DOC_TEXT } from './menu/menubar.docs.translations';
import { PANEL_MENU_DOC_TEXT } from './menu/panel-menu.docs.translations';
import { SIDEBAR_DOC_TEXT } from './menu/sidebar.docs.translations';
import { SLIDEMENU_DOC_TEXT } from './menu/slidemenu.docs.translations';
import { STEPS_DOC_TEXT } from './menu/steps.docs.translations';
import { TIERED_MENU_DOC_TEXT } from './menu/tiered-menu.docs.translations';

const MENU_DOC_TEXT_ES = {
  ...BREADCRUMB_DOC_TEXT.es,
  ...STEPS_DOC_TEXT.es,
  ...PANEL_MENU_DOC_TEXT.es,
  ...SIDEBAR_DOC_TEXT.es,
  ...CONTEXT_MENU_DOC_TEXT.es,
  ...TIERED_MENU_DOC_TEXT.es,
  ...MENUBAR_DOC_TEXT.es,
  ...MEGAMENU_DOC_TEXT.es,
  ...SLIDEMENU_DOC_TEXT.es,
};

const MENU_DOC_TEXT_EN = {
  ...BREADCRUMB_DOC_TEXT.en,
  ...STEPS_DOC_TEXT.en,
  ...PANEL_MENU_DOC_TEXT.en,
  ...SIDEBAR_DOC_TEXT.en,
  ...CONTEXT_MENU_DOC_TEXT.en,
  ...TIERED_MENU_DOC_TEXT.en,
  ...MENUBAR_DOC_TEXT.en,
  ...MEGAMENU_DOC_TEXT.en,
  ...SLIDEMENU_DOC_TEXT.en,
};

export const MENU_DOC_TEXT = {
  es: MENU_DOC_TEXT_ES,
  en: MENU_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type MenuDocsTextKey = keyof (typeof MENU_DOC_TEXT)['en'];
