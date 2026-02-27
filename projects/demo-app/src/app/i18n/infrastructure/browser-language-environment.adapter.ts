import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import type { DemoLanguageEnvironmentPort } from '../application/ports/language-environment.port';
import { DemoLanguage } from '../types';

@Injectable({ providedIn: 'root' })
export class BrowserLanguageEnvironmentAdapter
  implements DemoLanguageEnvironmentPort
{
  private readonly document = inject(DOCUMENT);

  readBrowserLanguage(): string {
    return this.document.defaultView?.navigator?.language?.toLowerCase() ?? 'en';
  }

  setDocumentLanguage(language: DemoLanguage): void {
    const root = this.document.documentElement;
    if (root) {
      root.lang = language;
    }
  }
}
