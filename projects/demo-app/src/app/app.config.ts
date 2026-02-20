import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  importProvidersFrom, isDevMode,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { provideServiceWorker } from '@angular/service-worker';

const kebabCase = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const legacyIconAliases: Record<string, string> = {
  'alert-triangle': 'triangle-alert',
  'bar-chart-2': 'chart-no-axes-column',
  'check-circle': 'circle-check',
  'circle-help': 'circle-question-mark',
  'help-circle': 'circle-question-mark',
  layout: 'layout-grid',
  sliders: 'sliders-vertical',
};

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

for (const [alias, canonical] of Object.entries(legacyIconAliases)) {
  const canonicalIcon = lucideIcons[canonical];
  if (canonicalIcon) {
    lucideIcons[alias] = canonicalIcon;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        scss: () => import('highlight.js/lib/languages/scss'),
        xml: () => import('highlight.js/lib/languages/xml'),
        json: () => import('highlight.js/lib/languages/json'),
        bash: () => import('highlight.js/lib/languages/bash'),
      },
    }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
