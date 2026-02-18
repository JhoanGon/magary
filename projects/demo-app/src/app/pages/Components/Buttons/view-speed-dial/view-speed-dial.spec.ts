import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { ViewSpeedDial } from './view-speed-dial';
describe('ViewSpeedDial', () => {
  let component: ViewSpeedDial;
  let fixture: ComponentFixture<ViewSpeedDial>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSpeedDial],
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
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewSpeedDial);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


