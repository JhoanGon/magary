import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryMessage } from './message';

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

describe('MagaryMessage behavior', () => {
  let fixture: ComponentFixture<MagaryMessage>;
  let component: MagaryMessage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryMessage],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryMessage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    fixture.destroy();
  });

  it('renders summary/detail and computes default icon from severity', () => {
    fixture.componentRef.setInput('severity', 'warn');
    fixture.componentRef.setInput('text', 'Warning');
    fixture.componentRef.setInput('detail', 'Check this message');
    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector(
      '.magary-message-summary',
    ) as HTMLElement | null;
    const detail = fixture.nativeElement.querySelector(
      '.magary-message-detail',
    ) as HTMLElement | null;

    expect(component.iconClass()).toBe('triangle-alert');
    expect(summary?.textContent).toContain('Warning');
    expect(detail?.textContent).toContain('Check this message');
  });

  it('uses explicit icon override over severity defaults', () => {
    fixture.componentRef.setInput('severity', 'error');
    fixture.componentRef.setInput('icon', 'settings');
    fixture.detectChanges();

    expect(component.iconClass()).toBe('settings');
  });

  it('closes from close button and emits onClose once', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.componentRef.setInput('text', 'Closable');
    fixture.detectChanges();

    let closeCalls = 0;
    component.onClose.subscribe(() => {
      closeCalls += 1;
    });

    const closeButton = fixture.nativeElement.querySelector(
      '.magary-message-close',
    ) as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(closeCalls).toBe(1);
  });

  it('auto closes when life is configured', () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('life', 250);
    fixture.componentRef.setInput('text', 'Autoclose');
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    vi.advanceTimersByTime(250);
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });

  it('auto closes when life is set after initial render', () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('text', 'Deferred life');
    fixture.detectChanges();
    expect(component.visible()).toBe(true);

    fixture.componentRef.setInput('life', 100);
    fixture.detectChanges();

    vi.advanceTimersByTime(100);
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });
});

