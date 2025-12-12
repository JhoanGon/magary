import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagarySlider, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-slider',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagarySlider,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-slider.html',
  styleUrl: './view-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSlider {
  val1: number = 20;
  val2: number = 50;
  val3: number = 20;
  val4: number[] = [20, 80];
  val5: number = 50;

  importRef = `import { MagarySlider } from 'ng-magary';`;

  codeBasic = `<div class="p-fluid">
    <h3>Basic: {{val1}}</h3>
    <magary-slider [(ngModel)]="val1"></magary-slider>
</div>`;

  codeSteps = `<div class="p-fluid">
    <h3>Steps (20): {{val3}}</h3>
    <magary-slider [(ngModel)]="val3" [step]="20"></magary-slider>
</div>`;

  codeRange = `<div class="p-fluid">
    <h3>Range: {{val4}}</h3>
    <magary-slider [(ngModel)]="val4" [range]="true"></magary-slider>
</div>`;

  codeVertical = `<div class="p-fluid">
    <h3>Vertical: {{val5}}</h3>
    <div style="height: 200px; display: flex; justify-content: center; align-items: center;">
        <magary-slider [(ngModel)]="val5" orientation="vertical"></magary-slider>
    </div>
</div>`;

  tsCode = `export class MyComponent {
      val1: number = 20;
      val3: number = 20;
      val4: number[] = [20, 80];
      val5: number = 50;
  }`;
}
