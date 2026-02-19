import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('tab', { static: true }) tab!: MagaryTab;
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
    expect(host.tab.label()).toBe('Profile');
    expect(host.tab.active()).toBe(false);
    expect(fixture.nativeElement.textContent).not.toContain('Profile Content');
  });

  it('shows projected content when active signal is true', () => {
    host.tab.active.set(true);
    fixture.detectChanges();

    expect(host.tab.active()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Profile Content');
  });
});
