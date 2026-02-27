import { DemoLanguage } from '../types';
import { GETTING_STARTED_NAV_TEXT } from './nav/getting-started.nav.translations';
import { SIDEBAR_SECTIONS_NAV_TEXT } from './nav/sidebar-sections.nav.translations';
import { UTILITIES_NAV_TEXT } from './nav/utilities.nav.translations';
import { BUTTONS_NAV_TEXT } from './nav/components/buttons.nav.translations';
import { DATA_NAV_TEXT } from './nav/components/data.nav.translations';
import { FILE_NAV_TEXT } from './nav/components/file.nav.translations';
import { FORM_NAV_TEXT } from './nav/components/form.nav.translations';
import { GRID_NAV_TEXT } from './nav/components/grid.nav.translations';
import { MEDIA_NAV_TEXT } from './nav/components/media.nav.translations';
import { MENU_NAV_TEXT } from './nav/components/menu.nav.translations';
import { MESSAGES_NAV_TEXT } from './nav/components/messages.nav.translations';
import { MISC_NAV_TEXT } from './nav/components/misc.nav.translations';
import { OVERLAY_NAV_TEXT } from './nav/components/overlay.nav.translations';
import { PANEL_NAV_TEXT } from './nav/components/panel.nav.translations';

const NAV_TEXT_ES = {
  ...SIDEBAR_SECTIONS_NAV_TEXT.es,
  ...GETTING_STARTED_NAV_TEXT.es,
  ...UTILITIES_NAV_TEXT.es,
  ...BUTTONS_NAV_TEXT.es,
  ...DATA_NAV_TEXT.es,
  ...FILE_NAV_TEXT.es,
  ...FORM_NAV_TEXT.es,
  ...GRID_NAV_TEXT.es,
  ...MEDIA_NAV_TEXT.es,
  ...MENU_NAV_TEXT.es,
  ...MESSAGES_NAV_TEXT.es,
  ...MISC_NAV_TEXT.es,
  ...OVERLAY_NAV_TEXT.es,
  ...PANEL_NAV_TEXT.es,
};

const NAV_TEXT_EN = {
  ...SIDEBAR_SECTIONS_NAV_TEXT.en,
  ...GETTING_STARTED_NAV_TEXT.en,
  ...UTILITIES_NAV_TEXT.en,
  ...BUTTONS_NAV_TEXT.en,
  ...DATA_NAV_TEXT.en,
  ...FILE_NAV_TEXT.en,
  ...FORM_NAV_TEXT.en,
  ...GRID_NAV_TEXT.en,
  ...MEDIA_NAV_TEXT.en,
  ...MENU_NAV_TEXT.en,
  ...MESSAGES_NAV_TEXT.en,
  ...MISC_NAV_TEXT.en,
  ...OVERLAY_NAV_TEXT.en,
  ...PANEL_NAV_TEXT.en,
};

export const NAV_TEXT: Record<DemoLanguage, Record<string, string>> = {
  es: NAV_TEXT_ES,
  en: NAV_TEXT_EN,
};
