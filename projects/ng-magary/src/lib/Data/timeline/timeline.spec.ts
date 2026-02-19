import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagaryTimeline } from './timeline';

@Component({
  standalone: true,
  imports: [MagaryTimeline],
  template: `
    <magary-timeline [value]="events" [layout]="layout" [align]="align">
      <ng-template #content let-event>
        <span class="event-content">{{ event.status }}</span>
      </ng-template>
      <ng-template #opposite let-event>
        <span class="event-date">{{ event.date }}</span>
      </ng-template>
    </magary-timeline>
  `,
})
class TimelineHostComponent {
  events = [
    { status: 'Ordered', date: '2026-01-01' },
    { status: 'Shipped', date: '2026-01-02' },
    { status: 'Delivered', date: '2026-01-03' },
  ];
  layout: 'vertical' | 'horizontal' = 'vertical';
  align: 'left' | 'right' | 'top' | 'bottom' | 'alternate' = 'left';
}

describe('MagaryTimeline behavior', () => {
  let fixture: ComponentFixture<TimelineHostComponent>;
  let host: TimelineHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders one timeline event per item with connectors except on last event', () => {
    const events = fixture.nativeElement.querySelectorAll(
      '.magary-timeline-event',
    ) as NodeListOf<HTMLElement>;
    const markers = fixture.nativeElement.querySelectorAll(
      '.magary-timeline-event-marker',
    ) as NodeListOf<HTMLElement>;
    const connectors = fixture.nativeElement.querySelectorAll(
      '.magary-timeline-event-connector',
    ) as NodeListOf<HTMLElement>;

    expect(events).toHaveLength(3);
    expect(markers).toHaveLength(3);
    expect(connectors).toHaveLength(2);
  });

  it('projects content and opposite templates for each event', () => {
    const renderedStatuses = Array.from(
      fixture.nativeElement.querySelectorAll('.event-content'),
    ).map((element: any) => element.textContent?.trim());
    const renderedDates = Array.from(
      fixture.nativeElement.querySelectorAll('.event-date'),
    ).map((element: any) => element.textContent?.trim());

    expect(renderedStatuses).toEqual(['Ordered', 'Shipped', 'Delivered']);
    expect(renderedDates).toEqual(['2026-01-01', '2026-01-02', '2026-01-03']);
  });

  it('updates timeline orientation and alignment CSS classes from inputs', () => {
    const altFixture = TestBed.createComponent(TimelineHostComponent);
    altFixture.componentInstance.layout = 'horizontal';
    altFixture.componentInstance.align = 'top';
    altFixture.detectChanges();

    const root = altFixture.nativeElement.querySelector(
      '.magary-timeline',
    ) as HTMLElement;
    expect(root.classList.contains('magary-timeline-horizontal')).toBe(true);
    expect(root.classList.contains('magary-timeline-top')).toBe(true);
    altFixture.destroy();
  });
});
