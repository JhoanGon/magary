import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryTimeline } from 'ng-magary';
import { MagaryCard } from 'ng-magary';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { MagaryButton } from 'ng-magary';
import { MagaryImage } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';
import { DocsTextKey } from '../../../../i18n/translations/docs-text.translations';

interface TimelineEvent {
  status: string;
  date: string;
  icon: string;
  color: string;
  image?: string;
  description?: string;
}

@Component({
  selector: 'view-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MagaryTimeline,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    MagaryButton,
    MagaryImage,
    Highlight,
    LucideAngularModule,
  ],
  templateUrl: './view-timeline.html',
  styleUrls: ['./view-timeline.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewTimeline {
  readonly i18n = inject(DemoI18nService);
  readonly t = (key: DocsTextKey) => this.i18n.translateDocs(key);

  events: TimelineEvent[] = [];

  horizontalEvents: string[] = [];

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  constructor() {
    this.events = [
      {
        status: 'Ordered',
        date: '15/10/2020 10:30',
        icon: 'shopping-cart',
        color: '#9C27B0',
        image:
          'https://primefaces.org/cdn/primeng/images/demo/product/game-controller.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
      {
        status: 'Processing',
        date: '15/10/2020 14:00',
        icon: 'settings',
        color: '#673AB7',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
      {
        status: 'Shipped',
        date: '15/10/2020 16:15',
        icon: 'box',
        color: '#FF9800',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
      {
        status: 'Delivered',
        date: '16/10/2020 10:00',
        icon: 'check',
        color: '#607D8B',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
      },
    ];

    this.horizontalEvents = ['2020', '2021', '2022', '2023'];
  }

  exampleHTML = `
<magary-timeline [value]="events">
    <ng-template #content let-event>
        <small class="text-secondary">{{event.date}}</small>
    </ng-template>
    <ng-template #opposite let-event>
        {{event.status}}
    </ng-template>
    <ng-template #marker let-event>
        <span class="custom-marker" [style.backgroundColor]="event.color">
            <lucide-icon [name]="event.icon" [size]="14"></lucide-icon>
        </span>
    </ng-template>
</magary-timeline>
`;

  exampleTS = `
export class ViewTimeline {
    events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'shopping-cart', color: '#9C27B0' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'settings', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'box', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'check', color: '#607D8B' }
    ];

}
`;

  exampleAlternateHTML = `
<magary-timeline [value]="events" align="alternate" class="timeline-custom-marker">
    <ng-template #content let-event>
        <magary-card [width]="'100%'" [shadow]="1" [borderRadius]="'0.5rem'" [style]="{'margin-bottom': '1rem'}">
            <div style="padding: 1rem">
                <strong>{{event.status}}</strong>
                @if (event.image) {
                    <div style="margin-top: 0.5rem">
                        <small>Image Placeholder</small>
                    </div>
                }
            </div>
        </magary-card>
    </ng-template>
    <ng-template #opposite let-event>
        <small class="text-secondary">{{event.date}}</small>
    </ng-template>
    <ng-template #marker let-event>
        <span class="custom-marker" [style.backgroundColor]="event.color">
            <lucide-icon [name]="event.icon" [size]="14"></lucide-icon>
        </span>
    </ng-template>
</magary-timeline>
`;

  exampleAlternateTS = `
export class ViewTimeline {
    events = [...]; // Same data as basic example
}
`;

  exampleHorizontalHTML = `
<magary-timeline [value]="horizontalEvents" layout="horizontal" align="top">
    <ng-template #content let-event>
        {{event}}
    </ng-template>
    <ng-template #opposite let-event>
        &nbsp;
    </ng-template>
</magary-timeline>
`;

  exampleHorizontalTS = `
export class ViewTimeline {
    horizontalEvents = ['2020', '2021', '2022', '2023'];
}
`;
}
