import { inject, InjectionToken } from '@angular/core';
import { BrowserLanguageEnvironmentAdapter } from '../../infrastructure/browser-language-environment.adapter';
import { DemoLanguage } from '../../types';

export interface DemoLanguageEnvironmentPort {
  readBrowserLanguage(): string;
  setDocumentLanguage(language: DemoLanguage): void;
}

export const DEMO_LANGUAGE_ENVIRONMENT_PORT =
  new InjectionToken<DemoLanguageEnvironmentPort>('DEMO_LANGUAGE_ENVIRONMENT_PORT', {
    providedIn: 'root',
    factory: () => inject(BrowserLanguageEnvironmentAdapter),
  });
