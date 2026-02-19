import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryCard } from './card';

describe('MagaryCard behavior', () => {
  let fixture: ComponentFixture<MagaryCard>;
  let component: MagaryCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MagaryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dispatches cardClick custom event when interactive', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article.card') as HTMLElement;
    const customEvents: CustomEvent[] = [];
    card.addEventListener('cardClick', (event) =>
      customEvents.push(event as CustomEvent),
    );

    card.click();
    fixture.detectChanges();

    expect(customEvents).toHaveLength(1);
    expect(customEvents[0].detail.event).toBeTruthy();
  });

  it('does not dispatch cardClick when disabled or loading', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article.card') as HTMLElement;
    const customEvents: CustomEvent[] = [];
    card.addEventListener('cardClick', (event) =>
      customEvents.push(event as CustomEvent),
    );

    card.click();
    fixture.detectChanges();
    expect(customEvents).toHaveLength(0);

    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    card.click();
    fixture.detectChanges();
    expect(customEvents).toHaveLength(0);
  });

  it('supports keyboard activation with Enter and Space', () => {
    fixture.componentRef.setInput('clickable', true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article.card') as HTMLElement;
    const customEvents: CustomEvent[] = [];
    card.addEventListener('cardClick', (event) =>
      customEvents.push(event as CustomEvent),
    );

    const enterEvent = {
      key: 'Enter',
      preventDefault: vi.fn(),
      target: card,
    } as unknown as KeyboardEvent;
    component.onCardKeydown(enterEvent);

    const spaceEvent = {
      key: ' ',
      preventDefault: vi.fn(),
      target: card,
    } as unknown as KeyboardEvent;
    component.onCardKeydown(spaceEvent);

    expect(enterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(spaceEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(customEvents).toHaveLength(2);
  });

  it('renders loading overlay, badge and variant/layout classes from inputs', () => {
    fixture.componentRef.setInput('img', '/assets/Magary.png');
    fixture.componentRef.setInput('positionImage', 'right');
    fixture.componentRef.setInput('variant', 'filled');
    fixture.componentRef.setInput('hoverEffect', false);
    fixture.componentRef.setInput('loading', true);
    fixture.componentRef.setInput('loadingText', 'Procesando...');
    fixture.componentRef.setInput('badge', 'NEW');
    fixture.componentRef.setInput('clickable', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('article.card') as HTMLElement;
    const badge = fixture.nativeElement.querySelector('.card-badge') as HTMLElement;
    const overlay = fixture.nativeElement.querySelector(
      '.card-loading-overlay',
    ) as HTMLElement;
    const image = fixture.nativeElement.querySelector('.card-img') as
      | HTMLImageElement
      | null;

    expect(card.classList.contains('layout-right')).toBe(true);
    expect(card.classList.contains('variant-filled')).toBe(true);
    expect(card.classList.contains('loading')).toBe(true);
    expect(card.classList.contains('disabled')).toBe(true);
    expect(card.classList.contains('no-hover')).toBe(true);
    expect(card.getAttribute('aria-busy')).toBe('true');
    expect(card.getAttribute('aria-disabled')).toBe('true');
    expect(badge.textContent?.trim()).toBe('NEW');
    expect(overlay.textContent).toContain('Procesando...');
    expect(image).toBeTruthy();
  });
});
