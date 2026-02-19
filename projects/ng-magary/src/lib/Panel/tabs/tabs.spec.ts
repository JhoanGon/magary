import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryTabs } from './tabs';
import { MagaryTab } from './tab/tab';

@Component({
  standalone: true,
  imports: [MagaryTabs, MagaryTab],
  template: `
    <magary-tabs #tabs>
      <magary-tab label="Overview">Overview Content</magary-tab>
      <magary-tab label="Settings">Settings Content</magary-tab>
      <magary-tab label="Billing">Billing Content</magary-tab>
    </magary-tabs>
  `,
})
class TabsHostComponent {
  @ViewChild('tabs', { static: true }) tabsComponent!: MagaryTabs;
}

describe('MagaryTabs behavior', () => {
  let fixture: ComponentFixture<TabsHostComponent>;
  let host: TabsHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('activates the first tab by default', () => {
    const tabButtons = fixture.nativeElement.querySelectorAll(
      '.tab-headers button',
    ) as NodeListOf<HTMLButtonElement>;

    expect(tabButtons).toHaveLength(3);
    expect(host.tabsComponent.activeIndex()).toBe(0);
    expect(host.tabsComponent.tabs()[0].active()).toBe(true);
    expect(host.tabsComponent.tabs()[1].active()).toBe(false);
    expect(tabButtons[0].classList.contains('active')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Overview Content');
    expect(fixture.nativeElement.textContent).not.toContain('Settings Content');
  });

  it('switches active tab and visible content on click', () => {
    const tabButtons = fixture.nativeElement.querySelectorAll(
      '.tab-headers button',
    ) as NodeListOf<HTMLButtonElement>;

    tabButtons[1].click();
    fixture.detectChanges();

    expect(host.tabsComponent.activeIndex()).toBe(1);
    expect(host.tabsComponent.tabs()[1].active()).toBe(true);
    expect(host.tabsComponent.tabs()[0].active()).toBe(false);
    expect(tabButtons[1].classList.contains('active')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Settings Content');
    expect(fixture.nativeElement.textContent).not.toContain('Overview Content');
  });

  it('updates underline css variables for the selected tab', async () => {
    const headers = fixture.nativeElement.querySelector(
      '.tab-headers',
    ) as HTMLElement;
    const tabButtons = fixture.nativeElement.querySelectorAll(
      '.tab-headers button',
    ) as NodeListOf<HTMLButtonElement>;

    Object.defineProperty(tabButtons[2], 'offsetLeft', {
      configurable: true,
      get: () => 120,
    });
    Object.defineProperty(tabButtons[2], 'offsetWidth', {
      configurable: true,
      get: () => 80,
    });

    host.tabsComponent.selectTab(2);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(headers.style.getPropertyValue('--underline-left')).toBe('120px');
    expect(headers.style.getPropertyValue('--underline-width')).toBe('80px');
  });
});
