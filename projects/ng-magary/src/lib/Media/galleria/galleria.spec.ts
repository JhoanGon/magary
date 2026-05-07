import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryGalleria } from './galleria';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

type LucideIconData = (typeof icons)[keyof typeof icons];

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, LucideIconData>,
);

describe('MagaryGalleria', () => {
  let fixture: ComponentFixture<MagaryGalleria>;
  let component: MagaryGalleria;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryGalleria],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryGalleria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts with empty value array by default', () => {
    expect(component.value()).toEqual([]);
  });

  it('activeIndex model defaults to 0', () => {
    expect(component.activeIndex()).toBe(0);
  });

  it('activeIndex is writable via model', () => {
    component.activeIndex.set(2);
    expect(component.activeIndex()).toBe(2);
  });

  it('applies thumbnailsPosition class', () => {
    fixture.componentRef.setInput('thumbnailsPosition', 'left');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList.contains('magary-galleria-thumbnails-left')).toBe(true);
  });

  it('showThumbnails defaults to true', () => {
    expect(component.showThumbnails()).toBe(true);
  });

  it('circular defaults to true', () => {
    expect(component.circular()).toBe(true);
  });

  it('autoPlay defaults to false', () => {
    expect(component.autoPlay()).toBe(false);
  });

  it('showIndicators defaults to false', () => {
    expect(component.showIndicators()).toBe(false);
  });

  it('enableZoom defaults to true', () => {
    expect(component.enableZoom()).toBe(true);
  });

  it('transitionInterval defaults to 4000', () => {
    expect(component.transitionInterval()).toBe(4000);
  });

  it('theme defaults to dark', () => {
    expect(component.theme()).toBe('dark');
  });
});

describe('MagaryGalleria mobile gestures', () => {
  let fixture: ComponentFixture<MagaryGalleria>;
  let component: MagaryGalleria;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryGalleria],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryGalleria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts pinch zoom from default scale on touch devices', () => {
    component.onTouchStart({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
    } as unknown as TouchEvent);

    const preventDefault = vi.fn();

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 200 },
      ],
      preventDefault,
    } as unknown as TouchEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(component.zoomLevel()).toBeGreaterThan(1);
    expect(component.isZoomed()).toBe(true);
  });

  it('resets zoomed state when pinch zoom returns to base scale', () => {
    component.onTouchStart({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
    } as unknown as TouchEvent);

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 200 },
      ],
      preventDefault: vi.fn(),
    } as unknown as TouchEvent);

    component.onTouchMove({
      touches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 100 },
      ],
      preventDefault: vi.fn(),
    } as unknown as TouchEvent);

    expect(component.zoomLevel()).toBe(1);
    expect(component.isZoomed()).toBe(false);
  });
});
