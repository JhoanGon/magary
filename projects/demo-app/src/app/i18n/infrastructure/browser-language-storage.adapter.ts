import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import type { DemoLanguageStoragePort } from '../application/ports/language-storage.port';
import { DemoLanguage, isDemoLanguage } from '../types';

const STORAGE_KEY = 'magary.demo.language';

@Injectable({ providedIn: 'root' })
export class BrowserLanguageStorageAdapter implements DemoLanguageStoragePort {
  private readonly document = inject(DOCUMENT);

  read(): DemoLanguage | null {
    try {
      const storedLanguage =
        this.document.defaultView?.localStorage?.getItem(STORAGE_KEY);
      return isDemoLanguage(storedLanguage) ? storedLanguage : null;
    } catch {
      return null;
    }
  }

  write(language: DemoLanguage): void {
    try {
      this.document.defaultView?.localStorage?.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access errors in restricted environments.
    }
  }
}
