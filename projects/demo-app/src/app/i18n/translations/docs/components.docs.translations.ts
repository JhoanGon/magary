import { DemoLanguage } from '../../types';
import {
  BUTTONS_DOC_TEXT,
  ButtonsDocsTextKey,
} from './components/buttons.docs.translations';
import { DATA_DOC_TEXT, DataDocsTextKey } from './components/data.docs.translations';
import { FILE_DOC_TEXT, FileDocsTextKey } from './components/file.docs.translations';
import { FORM_DOC_TEXT, FormDocsTextKey } from './components/form.docs.translations';
import {
  GRID_CATEGORY_DOC_TEXT,
  GridDocsTextKey,
} from './components/grid.docs.translations';
import { MEDIA_DOC_TEXT, MediaDocsTextKey } from './components/media.docs.translations';
import { MISC_DOC_TEXT, MiscDocsTextKey } from './components/misc.docs.translations';
import { MENU_DOC_TEXT, MenuDocsTextKey } from './components/menu.docs.translations';
import {
  PANEL_DOC_TEXT,
  PanelDocsTextKey,
} from './components/panel.docs.translations';
import {
  MESSAGES_DOC_TEXT,
  MessagesDocsTextKey,
} from './components/messages.docs.translations';
import {
  OVERLAY_DOC_TEXT,
  OverlayDocsTextKey,
} from './components/overlay.docs.translations';

const COMPONENTS_DOC_TEXT_ES = {
  ...BUTTONS_DOC_TEXT.es,
  ...DATA_DOC_TEXT.es,
  ...FILE_DOC_TEXT.es,
  ...FORM_DOC_TEXT.es,
  ...GRID_CATEGORY_DOC_TEXT.es,
  ...MEDIA_DOC_TEXT.es,
  ...MISC_DOC_TEXT.es,
  ...MENU_DOC_TEXT.es,
  ...PANEL_DOC_TEXT.es,
  ...MESSAGES_DOC_TEXT.es,
  ...OVERLAY_DOC_TEXT.es,
};

const COMPONENTS_DOC_TEXT_EN = {
  ...BUTTONS_DOC_TEXT.en,
  ...DATA_DOC_TEXT.en,
  ...FILE_DOC_TEXT.en,
  ...FORM_DOC_TEXT.en,
  ...GRID_CATEGORY_DOC_TEXT.en,
  ...MEDIA_DOC_TEXT.en,
  ...MISC_DOC_TEXT.en,
  ...MENU_DOC_TEXT.en,
  ...PANEL_DOC_TEXT.en,
  ...MESSAGES_DOC_TEXT.en,
  ...OVERLAY_DOC_TEXT.en,
};

export const COMPONENTS_DOC_TEXT = {
  es: COMPONENTS_DOC_TEXT_ES,
  en: COMPONENTS_DOC_TEXT_EN,
} as const satisfies Record<DemoLanguage, Record<string, string>>;

export type ComponentsDocsTextKey =
  | ButtonsDocsTextKey
  | DataDocsTextKey
  | FileDocsTextKey
  | MediaDocsTextKey
  | FormDocsTextKey
  | GridDocsTextKey
  | MiscDocsTextKey
  | MenuDocsTextKey
  | PanelDocsTextKey
  | MessagesDocsTextKey
  | OverlayDocsTextKey;
