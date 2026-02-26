import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryTab } from './tab';

@Component({
  standalone: true,
  imports: [MagaryTab],
  template: `
    <magary-tab #tab label="Profile">Profile Content</magary-tab>
  `,
})
class TabHostComponent {
  tab = viewChild.required<MagaryTab>('tab');
}

describe('MagaryTab behavior', () => {
  let fixture: ComponentFixture<TabHostComponent>;
  let host: TabHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('keeps projected content hidden while tab is inactive', () => {
    const tabElement = fixture.nativeElement.querySelector(
      'magary-tab',
    ) as HTMLElement;

    expect(host.tab().label()).toBe('Profile');
    expect(host.tab().active()).toBe(false);
    expect(tabElement.getAttribute('role')).toBe('tabpanel');
    expect(tabElement.getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.textContent).not.toContain('Profile Content');
  });

  it('shows projected content when active signal is true', () => {
    host.tab().active.set(true);
    fixture.detectChanges();
    const tabElement = fixture.nativeElement.querySelector(
      'magary-tab',
    ) as HTMLElement;

    expect(host.tab().active()).toBe(true);
    expect(tabElement.getAttribute('aria-hidden')).toBe('false');
    expect(fixture.nativeElement.textContent).toContain('Profile Content');
  });

  it('binds panel id and labelledby attributes when provided', () => {
    host.tab().panelId.set('profile-panel');
    host.tab().labelledBy.set('profile-tab');
    fixture.detectChanges();

    const tabElement = fixture.nativeElement.querySelector(
      'magary-tab',
    ) as HTMLElement;

    expect(tabElement.id).toBe('profile-panel');
    expect(tabElement.getAttribute('aria-labelledby')).toBe('profile-tab');
  });
});
