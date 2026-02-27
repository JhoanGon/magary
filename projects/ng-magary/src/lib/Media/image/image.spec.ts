import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryImage } from './image';

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
  {} as Record<string, (typeof icons)[keyof typeof icons]>,
);

describe('MagaryImage behavior', () => {
  let fixture: ComponentFixture<MagaryImage>;
  let component: MagaryImage;
  let showModalSpy: ReturnType<typeof vi.spyOn>;
  let closeSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
        this.open = true;
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
        this.open = false;
      };
    }

    showModalSpy = vi
      .spyOn(HTMLDialogElement.prototype, 'showModal')
      .mockImplementation(function (this: HTMLDialogElement) {
        this.open = true;
      });
    closeSpy = vi
      .spyOn(HTMLDialogElement.prototype, 'close')
      .mockImplementation(function (this: HTMLDialogElement) {
        this.open = false;
      });

    await TestBed.configureTestingModule({
      imports: [MagaryImage],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryImage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('src', 'https://example.com/image.png');
    fixture.componentRef.setInput('alt', 'Sample image');
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates load/error flags and emits related outputs', () => {
    let loadCalls = 0;
    let errorCalls = 0;
    component.onLoad.subscribe(() => {
      loadCalls += 1;
    });
    component.onError.subscribe(() => {
      errorCalls += 1;
    });

    component.onImageLoad(new Event('load'));
    component.onImageError(new Event('error'));

    expect(component.loaded).toBe(true);
    expect(component.error).toBe(true);
    expect(loadCalls).toBe(1);
    expect(errorCalls).toBe(1);
  });

  it('opens preview dialog only when preview input is enabled', () => {
    const image = fixture.nativeElement.querySelector(
      '.magary-image-content img',
    ) as HTMLImageElement;

    fixture.componentRef.setInput('preview', false);
    fixture.detectChanges();
    image.click();
    expect(showModalSpy).not.toHaveBeenCalled();

    fixture.componentRef.setInput('preview', true);
    fixture.detectChanges();
    image.click();
    expect(showModalSpy).toHaveBeenCalledTimes(1);
  });

  it('resets transform state when preview closes', () => {
    component.zoomIn();
    component.rotateRight();
    expect(component.scale()).toBeGreaterThan(1);
    expect(component.rotate()).toBe(90);

    component.closePreview();

    expect(closeSpy).toHaveBeenCalled();
    expect(component.scale()).toBe(1);
    expect(component.rotate()).toBe(0);
  });

  it('creates download link and triggers click action', () => {
    const nativeCreateElement = document.createElement.bind(document);
    const anchor = nativeCreateElement('a');
    const anchorClickSpy = vi.spyOn(anchor, 'click').mockImplementation(() => {});

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName.toLowerCase() === 'a') {
        return anchor;
      }
      return nativeCreateElement(tagName);
    });

    component.download();

    expect(anchor.download).toBe('Sample image');
    expect(anchor.href).toContain('https://example.com/image.png');
    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
  });
});

