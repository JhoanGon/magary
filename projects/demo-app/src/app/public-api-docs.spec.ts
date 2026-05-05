import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { ViewToast } from './pages/Components/Messages/view-toast/view-toast';
import { ViewConfirmDialog } from './pages/Components/Overlay/view-confirm-dialog/view-confirm-dialog';
import { TOAST_DOC_TEXT } from './i18n/translations/docs/components/messages/toast.docs.translations';
import { CONFIRM_DIALOG_DOC_TEXT } from './i18n/translations/docs/components/overlay/confirm-dialog.docs.translations';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('demo docs for the frozen root API', () => {
  const configureDocsTestingModule = async (component: unknown) => {
    await TestBed.configureTestingModule({
      imports: [component],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
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
        }),
      ],
    }).compileComponents();
  };

  it('documents the prefixed toast message type in examples and copy', async () => {
    await configureDocsTestingModule(ViewToast);

    const fixture: ComponentFixture<ViewToast> = TestBed.createComponent(ViewToast);
    const importSection = fixture.componentInstance.sections.find(
      (section) => section.id === 'import',
    );

    expect(importSection?.content?.code).toContain('MagaryToastMessage');
    expect(TOAST_DOC_TEXT.es['components.messages.toast.sections.apiToast.title']).toBe(
      'MagaryToastMessage',
    );
    expect(TOAST_DOC_TEXT.en['components.messages.toast.sections.apiToast.title']).toBe(
      'MagaryToastMessage',
    );
  });

  it('documents the prefixed confirmation contract in examples and copy', async () => {
    await configureDocsTestingModule(ViewConfirmDialog);

    const fixture: ComponentFixture<ViewConfirmDialog> =
      TestBed.createComponent(ViewConfirmDialog);

    expect(fixture.componentInstance.importCode).toContain('MagaryConfirmation');
    expect(fixture.componentInstance.exampleTS).toContain('MagaryConfirmation');
    expect(
      CONFIRM_DIALOG_DOC_TEXT.es['components.overlay.confirmDialog.service.title'],
    ).toBe('MagaryConfirmation');
    expect(
      CONFIRM_DIALOG_DOC_TEXT.en['components.overlay.confirmDialog.service.title'],
    ).toBe('MagaryConfirmation');
  });
});
