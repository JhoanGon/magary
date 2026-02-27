import { effect, inject, Injectable, signal } from '@angular/core';
import { DEMO_LANGUAGE_ENVIRONMENT_PORT } from './application/ports/language-environment.port';
import { DEMO_LANGUAGE_STORAGE_PORT } from './application/ports/language-storage.port';
import { NAV_TEXT } from './translations/nav-text.translations';
import { DOC_TEXT, DocsTextKey } from './translations/docs-text.translations';
import { UI_TEXT, UiTextKey } from './translations/ui-text.translations';
import { DemoLanguage } from './types';

export type { DemoLanguage } from './types';

@Injectable({ providedIn: 'root' })
export class DemoI18nService {
  private readonly languageStorage = inject(DEMO_LANGUAGE_STORAGE_PORT);
  private readonly languageEnvironment = inject(DEMO_LANGUAGE_ENVIRONMENT_PORT);
  private readonly languageState = signal<DemoLanguage>(
    this.resolveInitialLanguage(),
  );

  readonly language = this.languageState.asReadonly();

  constructor() {
    effect(() => {
      const language = this.languageState();
      this.syncDocumentLanguage(language);
      this.persistLanguage(language);
    });
  }

  setLanguage(language: DemoLanguage) {
    if (this.languageState() === language) {
      return;
    }

    this.languageState.set(language);
  }

  translateUi(key: UiTextKey): string {
    return UI_TEXT[this.languageState()][key] ?? UI_TEXT.en[key] ?? key;
  }

  translateNavigation(value: string): string {
    return NAV_TEXT[this.languageState()][value] ?? NAV_TEXT.en[value] ?? value;
  }

  translateDocs(key: DocsTextKey): string {
    return DOC_TEXT[this.languageState()][key] ?? DOC_TEXT.en[key] ?? key;
  }

  private resolveInitialLanguage(): DemoLanguage {
    const stored = this.languageStorage.read();
    if (stored) {
      return stored;
    }

    const browserLanguage = this.languageEnvironment.readBrowserLanguage();
    return browserLanguage.startsWith('es') ? 'es' : 'en';
  }

  private persistLanguage(language: DemoLanguage) {
    this.languageStorage.write(language);
  }

  private syncDocumentLanguage(language: DemoLanguage) {
    this.languageEnvironment.setDocumentLanguage(language);
  }
}
