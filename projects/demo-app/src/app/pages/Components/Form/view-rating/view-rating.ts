import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryRating, MagaryTab, MagaryTabs } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-view-rating',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryRating,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-rating.html',
  styleUrl: './view-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRating {
  readonly i18n = inject(DemoI18nService);

  val1 = 3;
  val2 = 4;
  val3 = 5;
  val4 = 2;

  importRef = `import { MagaryRating } from 'ng-magary';`;

  codeBasic = `<div class="p-fluid">
  <h3>Value: {{val1}}</h3>
  <magary-rating [(ngModel)]="val1"></magary-rating>
</div>`;

  codeNoCancel = `<div class="p-fluid">
  <h3>Value: {{val2}}</h3>
  <magary-rating [(ngModel)]="val2" [cancel]="false"></magary-rating>
</div>`;

  codeReadOnly = `<div class="p-fluid">
  <h3>Value: {{val3}}</h3>
  <magary-rating [(ngModel)]="val3" [readonly]="true"></magary-rating>
</div>`;

  codeCustomStars = `<div class="p-fluid">
  <h3>Value: {{val4}}</h3>
  <magary-rating [(ngModel)]="val4" [stars]="10"></magary-rating>
</div>`;

  tsCode = `export class MyComponent {
  val1: number = 3;
  val2: number = 4;
  val3: number = 5;
  val4: number = 2;
}`;
}
