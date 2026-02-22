import { Component, viewChild } from '@angular/core';
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
  tabsComponent = viewChild.required<MagaryTabs>('tabs');
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
    expect(host.tabsComponent().activeIndex()).toBe(0);
    expect(host.tabsComponent().tabs()[0].active()).toBe(true);
    expect(host.tabsComponent().tabs()[1].active()).toBe(false);
    expect(tabButtons[0].classList.contains('active')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Overview Content');
    expect(fixture.nativeElement.textContent).not.toContain('Settings Content');
  });

  it('renders tab headers as non-submit buttons with aria-selected state', () => {
    const tabButtons = fixture.nativeElement.querySelectorAll(
      '.tab-headers button',
    ) as NodeListOf<HTMLButtonElement>;

    expect(tabButtons[0].type).toBe('button');
    expect(tabButtons[0].getAttribute('role')).toBe('tab');
    expect(tabButtons[0].getAttribute('aria-selected')).toBe('true');
    expect(tabButtons[1].getAttribute('aria-selected')).toBe('false');
  });

  it('uses full panel width by default to avoid content gaps', () => {
    const tabContent = fixture.nativeElement.querySelector(
      '.tab-content',
    ) as HTMLElement;

    expect(tabContent.style.getPropertyValue('--tab-panel-width')).toBe('100%');
  });

  it('switches active tab and visible content on click', () => {
    const tabButtons = fixture.nativeElement.querySelectorAll(
      '.tab-headers button',
    ) as NodeListOf<HTMLButtonElement>;
    const projectedTabs = fixture.nativeElement.querySelectorAll(
      'magary-tab',
    ) as NodeListOf<HTMLElement>;

    expect(projectedTabs[0].classList.contains('magary-tab-active')).toBe(true);
    expect(projectedTabs[1].classList.contains('magary-tab-active')).toBe(false);

    tabButtons[1].click();
    fixture.detectChanges();

    expect(host.tabsComponent().activeIndex()).toBe(1);
    expect(host.tabsComponent().tabs()[1].active()).toBe(true);
    expect(host.tabsComponent().tabs()[0].active()).toBe(false);
    expect(tabButtons[1].classList.contains('active')).toBe(true);
    expect(projectedTabs[1].classList.contains('magary-tab-active')).toBe(true);
    expect(projectedTabs[0].classList.contains('magary-tab-active')).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Settings Content');
    expect(fixture.nativeElement.textContent).not.toContain('Overview Content');
  });

  it('clamps activeIndex when it exceeds available tabs', () => {
    host.tabsComponent().activeIndex.set(99);
    fixture.detectChanges();

    expect(host.tabsComponent().activeIndex()).toBe(2);
    expect(host.tabsComponent().tabs()[2].active()).toBe(true);
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

    host.tabsComponent().selectTab(2);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(headers.style.getPropertyValue('--underline-left')).toBe('120px');
    expect(headers.style.getPropertyValue('--underline-width')).toBe('80px');
  });
});
