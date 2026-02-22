import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryOverlayPanel } from './overlaypanel';

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

describe('MagaryOverlayPanel behavior', () => {
  let fixture: ComponentFixture<MagaryOverlayPanel>;
  let component: MagaryOverlayPanel;
  let target: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryOverlayPanel],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    vi.useFakeTimers();

    fixture = TestBed.createComponent(MagaryOverlayPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();

    target = document.createElement('button');
    target.getBoundingClientRect = () =>
      ({
        top: 100,
        left: 120,
        right: 220,
        bottom: 140,
        width: 100,
        height: 40,
      }) as DOMRect;
    document.body.appendChild(target);
  });

  afterEach(() => {
    component.hide();
    target.remove();
    document
      .querySelectorAll('.magary-overlaypanel')
      .forEach((element) => element.parentNode?.removeChild(element));
    fixture.destroy();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  function openPanel() {
    component.show(new MouseEvent('click'), target);
    fixture.detectChanges();
    vi.runAllTimers();
    fixture.detectChanges();
  }

  it('shows and hides via toggle while emitting onShow and onHide', () => {
    let showCalls = 0;
    let hideCalls = 0;
    component.onShow.subscribe(() => {
      showCalls += 1;
    });
    component.onHide.subscribe(() => {
      hideCalls += 1;
    });

    component.toggle(new MouseEvent('click'), target);
    fixture.detectChanges();
    vi.runAllTimers();
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
    expect(document.body.querySelector('.magary-overlaypanel')).toBeTruthy();
    expect(showCalls).toBe(1);

    component.toggle(new MouseEvent('click'), target);
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(document.body.querySelector('.magary-overlaypanel')).toBeNull();
    expect(hideCalls).toBe(1);
  });

  it('closes when clicking outside if dismissable is enabled', () => {
    fixture.componentRef.setInput('dismissable', true);
    fixture.detectChanges();
    openPanel();
    expect(component.visible()).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });

  it('keeps panel open on outside click when dismissable is disabled', () => {
    fixture.componentRef.setInput('dismissable', false);
    fixture.detectChanges();
    openPanel();
    expect(component.visible()).toBe(true);

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.visible()).toBe(true);
  });

  it('renders close icon and hides when icon button is clicked', () => {
    fixture.componentRef.setInput('showCloseIcon', true);
    fixture.detectChanges();
    openPanel();

    const closeButton = document.body.querySelector(
      '.magary-overlaypanel-close',
    ) as HTMLButtonElement;
    expect(closeButton).toBeTruthy();

    closeButton.click();
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
  });
});

