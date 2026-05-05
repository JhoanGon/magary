import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom, signal } from '@angular/core';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { Subject } from 'rxjs';
import { LucideAngularModule, icons } from 'lucide-angular';
import { Layout } from './layout/layout';
import { PwaService } from './layout/service/pwa.service';
import { ViewSelect } from './pages/Components/Form/view-select/view-select';
import { ViewCascadeSelect } from './pages/Components/Form/view-cascade-select/view-cascade-select';

class RouterStub {
  readonly events = new Subject<unknown>();
  url = '/';

  createUrlTree(
    commands: readonly unknown[],
    extras?: { queryParams?: Record<string, unknown> },
  ) {
    return {
      commands: [...commands],
      queryParams: extras?.queryParams ?? null,
    };
  }

  serializeUrl(urlTree: {
    commands?: readonly unknown[];
    queryParams?: Record<string, unknown> | null;
  }): string {
    const path = (urlTree.commands ?? [])
      .map((segment) => `${segment}`.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/');

    const query =
      urlTree.queryParams && Object.keys(urlTree.queryParams).length > 0
        ? `?${new URLSearchParams(
            Object.entries(urlTree.queryParams).reduce(
              (params, [key, value]) => ({
                ...params,
                [key]: `${value}`,
              }),
              {} as Record<string, string>,
            ),
          ).toString()}`
        : '';

    return `/${path}${query}`;
  }

  isActive(urlTree: {
    commands?: readonly unknown[];
    queryParams?: Record<string, unknown> | null;
  }): boolean {
    return this.serializeUrl(urlTree) === this.url;
  }
}

const pwaServiceStub = {
  installable: signal(false),
  isIos: signal(false),
  install: vi.fn(),
};

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

describe('demo consumers of the frozen root API', () => {
  let router: RouterStub;

  beforeEach(() => {
    router = new RouterStub();
  });

  afterEach(() => {
    router.events.complete();
  });

  const configureDemoTestingModule = async (component: unknown) => {
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
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: {} },
        { provide: PwaService, useValue: pwaServiceStub },
      ],
    }).compileComponents();
  };

  it('keeps the layout standalone imports type-safe', async () => {
    await configureDemoTestingModule(Layout);

    const fixture: ComponentFixture<Layout> = TestBed.createComponent(Layout);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('keeps select demos aligned with the final component inputs', async () => {
    await configureDemoTestingModule(ViewSelect);

    const fixture: ComponentFixture<ViewSelect> =
      TestBed.createComponent(ViewSelect);

    expect(fixture.componentInstance.compareCountryByCode).toBeTypeOf('function');
  });

  it('keeps cascade-select demos aligned with the final compareWith contract', async () => {
    await configureDemoTestingModule(ViewCascadeSelect);

    const fixture: ComponentFixture<ViewCascadeSelect> =
      TestBed.createComponent(ViewCascadeSelect);

    expect(fixture.componentInstance.compareCascadeByCode).toBeTypeOf('function');
  });
});
