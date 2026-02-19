import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, icons } from 'lucide-angular';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { ViewSidebar } from './view-sidebar';

const kebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

describe('ViewSidebar', () => {
  let component: ViewSidebar;
  let fixture: ComponentFixture<ViewSidebar>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSidebar],
      providers: [
        provideRouter([]),
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
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


