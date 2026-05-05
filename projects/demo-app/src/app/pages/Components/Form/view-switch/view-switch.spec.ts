import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { ViewSwitch } from './view-switch';

describe('ViewSwitch', () => {
  let component: ViewSwitch;
  let fixture: ComponentFixture<ViewSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSwitch],
      providers: [
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

    fixture = TestBed.createComponent(ViewSwitch);
    component = fixture.componentInstance;
  });

  it('documents switch usage through Angular forms bindings', () => {
    expect(component.exampleBasic).toContain('[(ngModel)]');
    expect(component.exampleForms).toContain('formControlName="enabled"');
  });
});
