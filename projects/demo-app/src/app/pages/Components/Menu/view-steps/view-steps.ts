import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagarySteps,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
  StepsItem,
  MagaryButton,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'view-steps',
  standalone: true,
  imports: [
    CommonModule,
    MagarySteps,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
    MagaryButton,
    LucideAngularModule,
  ],
  templateUrl: './view-steps.html',
  styleUrls: ['./view-steps.scss'],
})
export class ViewSteps implements OnInit {
  items: StepsItem[] = [];
  activeIndex: number = 0;
  readOnly: boolean = false;

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  ngOnInit() {
    this.items = [
      { label: 'Personal', icon: 'user' },
      { label: 'Seat', icon: 'monitor' },
      { label: 'Payment', icon: 'credit-card' },
      { label: 'Confirmation', icon: 'check-circle' },
    ];
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  // Linear Example State
  activeIndexLinear: number = 0;

  next() {
    this.activeIndexLinear++;
  }

  prev() {
    this.activeIndexLinear--;
  }

  exampleHTML = `
<magary-steps [model]="items" [activeIndex]="activeIndex" [readonly]="false" (activeIndexChange)="onActiveIndexChange($event)">
    <ng-template let-item>
        <div class="flex flex-column align-items-center gap-2">
            <lucide-icon [name]="item.icon" [size]="20"></lucide-icon>
            <span>{{ item.label }}</span>
        </div>
    </ng-template>
</magary-steps>
`;

  exampleTS = `
import { StepsItem } from 'ng-magary';

export class ViewSteps implements OnInit {
    items: StepsItem[] = [];
    activeIndex: number = 0;

    ngOnInit() {
        this.items = [
            { label: 'Personal', icon: 'user' },
            { label: 'Seat', icon: 'monitor' },
            { label: 'Payment', icon: 'credit-card' },
            { label: 'Confirmation', icon: 'check-circle' }
        ];
    }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }
}
`;

  exampleLinearHTML = `
<!-- ReadOnly Steps (Controlled by Buttons) -->
<magary-steps [model]="items" [activeIndex]="activeIndex" [readonly]="true"></magary-steps>

<div class="flex gap-2 mt-4">
    <magary-button label="Back" (onClick)="prev()" [disabled]="activeIndex === 0"></magary-button>
    <magary-button label="Next" (onClick)="next()" [disabled]="activeIndex === items.length - 1"></magary-button>
</div>
`;

  exampleLinearTS = `
activeIndex: number = 0;

next() {
    this.activeIndex++;
}

prev() {
    this.activeIndex--;
}
`;

  exampleVerticalHTML = `
<magary-steps 
    [model]="items" 
    [activeIndex]="activeIndex" 
    [readonly]="false" 
    orientation="vertical">
</magary-steps>
`;

  // Content (Wizard) Example State
  activeIndexContent: number = 0;

  nextContent() {
    this.activeIndexContent++;
  }

  prevContent() {
    this.activeIndexContent--;
  }

  exampleContentHTML = `
<magary-steps [model]="items" [activeIndex]="activeIndex" [readonly]="true"></magary-steps>

<div class="step-content p-4 border-1 surface-border border-round mt-3">
    <ng-container [ngSwitch]="activeIndex">
        <div *ngSwitchCase="0">
            <h3>Personal Information</h3>
            <p>Enter your personal details here...</p>
        </div>
        <div *ngSwitchCase="1">
            <h3>Seat Selection</h3>
            <p>Choose your preferred seat...</p>
        </div>
        <div *ngSwitchCase="2">
            <h3>Payment</h3>
            <p>Enter payment information...</p>
        </div>
        <div *ngSwitchCase="3">
            <h3>Confirmation</h3>
            <p>Review and confirm your booking...</p>
        </div>
    </ng-container>
</div>

<div class="flex gap-2 mt-3 justify-content-end">
    <magary-button label="Back" (buttonClick)="prev()" [disabled]="activeIndex === 0"></magary-button>
    <magary-button label="Next" (buttonClick)="next()" [disabled]="activeIndex === items.length - 1"></magary-button>
</div>
`;

  exampleContentTS = `
activeIndex: number = 0;

next() {
    this.activeIndex++;
}

prev() {
    this.activeIndex--;
}
`;
}
