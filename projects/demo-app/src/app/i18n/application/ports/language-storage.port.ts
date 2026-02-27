import { inject, InjectionToken } from '@angular/core';
import { BrowserLanguageStorageAdapter } from '../../infrastructure/browser-language-storage.adapter';
import { DemoLanguage } from '../../types';

export interface DemoLanguageStoragePort {
  read(): DemoLanguage | null;
  write(language: DemoLanguage): void;
}

export const DEMO_LANGUAGE_STORAGE_PORT =
  new InjectionToken<DemoLanguageStoragePort>('DEMO_LANGUAGE_STORAGE_PORT', {
    providedIn: 'root',
    factory: () => inject(BrowserLanguageStorageAdapter),
  });
