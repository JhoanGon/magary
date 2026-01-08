import {
  Component,
  input,
  contentChild,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'magary-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="
        'magary-timeline magary-timeline-' +
        layout() +
        ' magary-timeline-' +
        align()
      "
    >
      @for (item of value(); track $index; let i = $index; let last = $last) {
        <div class="magary-timeline-event">
          <div class="magary-timeline-event-opposite">
            <ng-container
              *ngTemplateOutlet="
                oppositeTemplate() || null;
                context: { $implicit: item }
              "
            ></ng-container>
          </div>
          <div class="magary-timeline-event-separator">
            @if (markerTemplate()) {
              <ng-container
                *ngTemplateOutlet="
                  markerTemplate();
                  context: { $implicit: item }
                "
              ></ng-container>
            } @else {
              <div class="magary-timeline-event-marker"></div>
            }
            @if (!last) {
              <div class="magary-timeline-event-connector"></div>
            }
          </div>
          <div class="magary-timeline-event-content">
            <ng-container
              *ngTemplateOutlet="
                contentTemplate() || null;
                context: { $implicit: item }
              "
            ></ng-container>
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./timeline.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'magary-timeline-host',
  },
})
export class MagaryTimeline {
  value = input<any[]>([]);
  layout = input<'vertical' | 'horizontal'>('vertical');
  align = input<'left' | 'right' | 'top' | 'bottom' | 'alternate'>('left');

  contentTemplate = contentChild<TemplateRef<any>>('content');
  oppositeTemplate = contentChild<TemplateRef<any>>('opposite');
  markerTemplate = contentChild<TemplateRef<any>>('marker');
}
