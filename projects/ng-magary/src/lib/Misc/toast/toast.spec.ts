import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryToast } from './toast';
import { MagaryToastService } from './toast.service';

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

describe('MagaryToast', () => {
  let fixture: ComponentFixture<MagaryToast>;
  let service: MagaryToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryToast],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryToast);
    service = TestBed.inject(MagaryToastService);
    fixture.detectChanges();
  });

  afterEach(() => {
    service.clear();
  });

  it('renders toasts from the service', () => {
    service.add({ message: 'Test message' });
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-toast-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Test message');
  });

  it('renders multiple toasts in stacking order', () => {
    service.add({ message: 'First' });
    service.add({ message: 'Second' });
    service.add({ message: 'Third' });
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.magary-toast-item');
    expect(items.length).toBe(3);
  });

  it('closes toast via item close button', () => {
    service.add({ id: 'btn-close', message: 'Click x' });
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelector(
      '.toast-close-btn',
    ) as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(service.toasts()).toHaveLength(0);
  });

  it('renders toast icon element for each type', () => {
    service.add({ type: 'success', message: 'Done!' });
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('.toast-icon lucide-icon');
    expect(icon).toBeTruthy();
  });

  it('renders toast with custom icon type', () => {
    service.add({ type: 'success', icon: 'star', message: 'Custom icon' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item).toBeTruthy();
  });

  it('renders title and message', () => {
    service.add({ title: 'Header', message: 'Body text' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item.querySelector('.toast-title').textContent).toContain('Header');
    expect(item.querySelector('.toast-message').textContent).toContain('Body text');
  });

  it('sets alert role on toast items for screen readers', () => {
    service.add({ message: 'Accessible' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item.getAttribute('role')).toBe('alert');
    expect(item.getAttribute('aria-live')).toBe('assertive');
    expect(item.getAttribute('aria-atomic')).toBe('true');
  });

  it('applies error type class', () => {
    service.add({ type: 'error', message: 'Fail' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item.classList.contains('error')).toBe(true);
  });

  it('applies warning type class', () => {
    service.add({ type: 'warning', message: 'Warn' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item.classList.contains('warning')).toBe(true);
  });

  it('applies info type class by default when no type specified', () => {
    service.add({ message: 'No type' });
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.magary-toast-item');
    expect(item.classList.contains('info')).toBe(true);
  });

});

describe('MagaryToast styling inputs', () => {
  let fixture: ComponentFixture<MagaryToast>;
  let service: MagaryToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryToast],
      providers: [
        provideNoopAnimations(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryToast);
    service = TestBed.inject(MagaryToastService);

    fixture.componentRef.setInput('position', 'bottom-left' as const);
    fixture.componentRef.setInput('baseZIndex', 9999);
    fixture.componentRef.setInput('offsetX', '2rem');
    fixture.componentRef.setInput('offsetY', '3rem');
    fixture.detectChanges();
  });

  afterEach(() => {
    service.clear();
  });

  it('applies position class to container', () => {
    const container = fixture.nativeElement.querySelector('.magary-toast-container');
    expect(container.classList.contains('bottom-left')).toBe(true);
  });

  it('applies baseZIndex as style', () => {
    const container: HTMLElement = fixture.nativeElement.querySelector('.magary-toast-container');
    expect(container.style.zIndex).toBe('9999');
  });

  it('applies offsetX and offsetY as CSS custom properties', () => {
    const container: HTMLElement = fixture.nativeElement.querySelector('.magary-toast-container');
    expect(container.style.getPropertyValue('--magary-toast-offset-x')).toBe('2rem');
    expect(container.style.getPropertyValue('--magary-toast-offset-y')).toBe('3rem');
  });
});
