import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { Layout } from './layout';
describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [
        provideRouter([]),
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
    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


