import {
  Component,
  Input,
  ContentChild,
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
        layout +
        ' magary-timeline-' +
        align
      "
    >
      <div
        *ngFor="let item of value; let i = index; let last = last"
        class="magary-timeline-event"
      >
        <div class="magary-timeline-event-opposite">
          <ng-container
            *ngTemplateOutlet="
              oppositeTemplate || null;
              context: { $implicit: item }
            "
          ></ng-container>
        </div>
        <div class="magary-timeline-event-separator">
          <ng-container *ngIf="markerTemplate; else defaultMarker">
            <ng-container
              *ngTemplateOutlet="markerTemplate; context: { $implicit: item }"
            ></ng-container>
          </ng-container>
          <ng-template #defaultMarker>
            <div class="magary-timeline-event-marker"></div>
          </ng-template>
          <div *ngIf="!last" class="magary-timeline-event-connector"></div>
        </div>
        <div class="magary-timeline-event-content">
          <ng-container
            *ngTemplateOutlet="
              contentTemplate || null;
              context: { $implicit: item }
            "
          ></ng-container>
        </div>
      </div>
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
  @Input() value: any[] = [];
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() align: 'left' | 'right' | 'top' | 'bottom' | 'alternate' = 'left';

  @ContentChild('content') contentTemplate: TemplateRef<any> | null = null;
  @ContentChild('opposite') oppositeTemplate: TemplateRef<any> | null = null;
  @ContentChild('marker') markerTemplate: TemplateRef<any> | null = null;
}
