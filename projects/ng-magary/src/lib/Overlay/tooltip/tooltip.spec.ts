import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryTooltip } from './tooltip';

@Component({
  standalone: true,
  imports: [MagaryTooltip],
  template: `
    <button
      id="tooltip-host"
      [magaryTooltip]="tooltipText"
      [tooltipPosition]="position"
      type="button"
    >
      Hover me
    </button>
  `,
})
class TooltipHostComponent {
  tooltipText: string | undefined = 'Tooltip content';
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

describe('MagaryTooltip behavior', () => {
  let fixture: ComponentFixture<TooltipHostComponent>;
  let host: TooltipHostComponent;
  let hostButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipHostComponent);
    host = fixture.componentInstance;
  });

  afterEach(() => {
    document
      .querySelectorAll('.magary-tooltip')
      .forEach((element) => element.parentNode?.removeChild(element));
    fixture.destroy();
  });

  function renderHost() {
    fixture.detectChanges();
    hostButton = fixture.nativeElement.querySelector(
      '#tooltip-host',
    ) as HTMLButtonElement;
  }

  it('shows tooltip with provided text and position class on mouseenter', () => {
    host.position = 'right';
    renderHost();

    hostButton.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const tooltip = document.body.querySelector('.magary-tooltip') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain('Tooltip content');
    expect(tooltip.classList.contains('magary-tooltip-right')).toBe(true);
    expect(tooltip.classList.contains('magary-tooltip-visible')).toBe(true);
  });

  it('hides tooltip on mouseleave', () => {
    renderHost();
    hostButton.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(document.body.querySelector('.magary-tooltip')).toBeTruthy();

    hostButton.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(document.body.querySelector('.magary-tooltip')).toBeNull();
  });

  it('does not create tooltip when text is empty', () => {
    host.tooltipText = undefined;
    renderHost();

    hostButton.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(document.body.querySelector('.magary-tooltip')).toBeNull();
  });

  it('hides tooltip when window scroll event is triggered', () => {
    renderHost();
    hostButton.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(document.body.querySelector('.magary-tooltip')).toBeTruthy();

    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(document.body.querySelector('.magary-tooltip')).toBeNull();
  });
});
