import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MagaryCarouselComponent } from './carousel';

const kebabCase = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

type LucideIconData = (typeof icons)[keyof typeof icons];
type CarouselItem = {
  id: number;
  name: string;
};

const lucideIcons = Object.entries(icons).reduce(
  (acc, [key, icon]) => {
    acc[key] = icon;
    acc[kebabCase(key)] = icon;
    return acc;
  },
  {} as Record<string, LucideIconData>,
);

describe('MagaryCarouselComponent', () => {
  let fixture: ComponentFixture<MagaryCarouselComponent<CarouselItem>>;
  let component: MagaryCarouselComponent<CarouselItem>;

  const items = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagaryCarouselComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      MagaryCarouselComponent<CarouselItem>,
    );
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', items);
    fixture.componentRef.setInput('numVisible', 3);
    fixture.componentRef.setInput('numScroll', 1);
    fixture.detectChanges();
  });

  it('calculates total pages based on visible and scroll settings', () => {
    expect(component.totalPages()).toBe(4);
    expect(component.pages()).toEqual([0, 1, 2, 3]);
  });

  it('navigates to requested page and updates two-way page model', () => {
    component.goToPage(2, false, 0);
    const internal = component as unknown as {
      _currentPage: () => number;
    };

    expect(internal._currentPage()).toBe(2);
    expect(component.page()).toBe(2);
  });

  it('wraps page index when circular mode is enabled', () => {
    fixture.componentRef.setInput('circular', true);
    fixture.detectChanges();

    component.goToPage(component.totalPages() - 1, false, 0);
    component.goToPage(component.totalPages(), false, 0);
    const internal = component as unknown as {
      _currentPage: () => number;
    };

    expect(internal._currentPage()).toBe(0);
  });

  it('preserves auto mode for numVisible', () => {
    fixture.componentRef.setInput('numVisible', 'auto' as unknown as number);
    fixture.detectChanges();
    const internal = component as unknown as {
      _activeNumVisible: () => number;
    };

    expect(internal._activeNumVisible()).toBe(-1);
    expect(component.effectiveNumVisible()).toBe(3);
  });

  it('applies gap compensation without overshooting transform offset', () => {
    fixture.componentRef.setInput('spaceBetween', 24);
    fixture.detectChanges();

    component.goToPage(2, false, 0);
    const style = component.transformStyle();

    expect(style.transform).toContain('-16px');
    expect(style.transform).not.toContain('-48px');
  });

  it('uses single-slide pagination for stacked effects', () => {
    fixture.componentRef.setInput('effect', 'fade');
    fixture.componentRef.setInput('numVisible', 3);
    fixture.componentRef.setInput('numScroll', 1);
    fixture.detectChanges();

    expect(component.totalPages()).toBe(items.length);
    expect(component.isItemActive(0)).toBe(true);
    expect(component.isItemActive(1)).toBe(false);

    component.goToPage(2, false, 0);

    expect(component.isItemActive(2)).toBe(true);
    expect(component.isItemActive(3)).toBe(false);
  });

  it('renders slide semantics with list/listitem roles and aria labels', () => {
    const viewport = fixture.nativeElement.querySelector(
      '.magary-carousel-viewport',
    ) as HTMLElement;
    const track = fixture.nativeElement.querySelector(
      '.magary-carousel-track',
    ) as HTMLElement;
    const firstItem = fixture.nativeElement.querySelector(
      '.magary-carousel-item',
    ) as HTMLElement;

    expect(viewport.id).toBe(component.viewportId);
    expect(viewport.getAttribute('role')).toBe('group');
    expect(track.getAttribute('role')).toBe('list');
    expect(firstItem.getAttribute('role')).toBe('listitem');
    expect(firstItem.getAttribute('aria-roledescription')).toBe('slide');
    expect(firstItem.getAttribute('aria-label')).toBe('Slide 1 of 6');
  });

  it('navigates slides with keyboard arrows on carousel wrapper', () => {
    const wrapper = fixture.nativeElement.querySelector(
      '.magary-carousel-wrapper',
    ) as HTMLElement;
    const internal = component as unknown as {
      _currentPage: () => number;
    };

    wrapper.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();

    expect(internal._currentPage()).toBe(1);
  });

  it('uses roving tabindex and keyboard navigation for indicators', () => {
    const indicators = fixture.nativeElement.querySelectorAll(
      '.magary-carousel-indicator',
    ) as NodeListOf<HTMLButtonElement>;

    expect(indicators[0].getAttribute('tabindex')).toBe('0');
    expect(indicators[1].getAttribute('tabindex')).toBe('-1');
    expect(indicators[0].getAttribute('aria-controls')).toBe(component.viewportId);

    indicators[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    expect(component.page()).toBe(1);
    expect(indicators[1].getAttribute('tabindex')).toBe('0');
    expect(indicators[1].getAttribute('aria-selected')).toBe('true');
  });
});
