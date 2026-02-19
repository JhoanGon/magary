import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { AvatarClickEvent, MagaryAvatar } from './avatar';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, any>,
);

describe('MagaryAvatar behavior', () => {
  let fixture: ComponentFixture<MagaryAvatar>;
  let component: MagaryAvatar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryAvatar],
      providers: [importProvidersFrom(LucideAngularModule.pick(lucideIcons))],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('derives initials from label and renders label fallback', () => {
    fixture.componentRef.setInput('label', 'Maria Garcia');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector(
      '.avatar-label',
    ) as HTMLElement;
    expect(component.displayLabel()).toBe('MG');
    expect(label.textContent?.trim()).toBe('MG');

    fixture.componentRef.setInput('label', 'sebastian');
    fixture.detectChanges();
    expect(component.displayLabel()).toBe('SE');
  });

  it('falls back from image to icon after image error', () => {
    fixture.componentRef.setInput('image', '/assets/avatar.png');
    fixture.componentRef.setInput('icon', 'user');
    fixture.componentRef.setInput('label', 'Fallback User');
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('.avatar-img') as
      | HTMLImageElement
      | null;
    expect(image).toBeTruthy();

    image?.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.imageError()).toBe(true);
    expect(component.shouldShowImage()).toBe(false);
    expect(component.shouldShowIcon()).toBe(true);
    expect(fixture.nativeElement.querySelector('.avatar-icon')).toBeTruthy();
  });

  it('emits avatar click events from mouse and keyboard when interactive', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('label', 'Usuario Activo');
    fixture.detectChanges();

    const events: AvatarClickEvent[] = [];
    component.avatarClick.subscribe((event) => events.push(event));

    const wrapper = fixture.nativeElement.querySelector(
      '.avatar-wrapper',
    ) as HTMLElement;
    wrapper.click();
    wrapper.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(events.length).toBeGreaterThanOrEqual(2);
    expect(events[0].type).toBe('avatar');
    expect(events[0].data?.label).toBe('Usuario Activo');
  });

  it('emits badge click without triggering avatar click', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('label', 'Badge User');
    fixture.componentRef.setInput('badgeValue', '3');
    fixture.componentRef.setInput('badgeSeverity', 'warning');
    fixture.detectChanges();

    const events: AvatarClickEvent[] = [];
    component.avatarClick.subscribe((event) => events.push(event));

    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    badge.click();
    fixture.detectChanges();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      type: 'badge',
      data: { value: '3', severity: 'warning' },
    });
  });

  it('blocks avatar and badge events when disabled or loading', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('label', 'Blocked User');
    fixture.componentRef.setInput('badgeValue', '1');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const events: AvatarClickEvent[] = [];
    component.avatarClick.subscribe((event) => events.push(event));

    const wrapper = fixture.nativeElement.querySelector(
      '.avatar-wrapper',
    ) as HTMLElement;
    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    wrapper.click();
    badge.click();
    fixture.detectChanges();
    expect(events).toHaveLength(0);

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    wrapper.click();
    badge.click();
    fixture.detectChanges();
    expect(events).toHaveLength(0);
  });
});
