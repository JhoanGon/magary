import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryDatePicker, MagaryTabsModule } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MagaryDatePicker,
    MagaryTabsModule,
    Highlight,
  ],
  templateUrl: './view-datepicker.html',
  styleUrl: './view-datepicker.scss',
})
export class ViewDatePicker {
  date: Date | null = null;

  importRef = `import { MagaryDatePicker } from 'ng-magary';
import { FormsModule } from '@angular/forms';`;

  basicHTML = `<magary-datepicker [(ngModel)]="date" placeholder="Select a date"></magary-datepicker>

<magary-datepicker disabled placeholder="Disabled"></magary-datepicker>`;

  basicTS = `date: Date | null = null;`;

  minDate = new Date();
  maxDate = new Date();

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  rangeDates: Date[] | null = null;

  rangeHTML = `<magary-datepicker 
  [(ngModel)]="rangeDates" 
  selectionMode="range" 
  placeholder="Select a date range">
</magary-datepicker>`;

  rangeTS = `rangeDates: Date[] | null = null;`;

  minMaxHTML = `<magary-datepicker 
  [(ngModel)]="date" 
  [minDate]="minDate" 
  [maxDate]="maxDate" 
  placeholder="Next 7 days only">
</magary-datepicker>`;

  minMaxTS = `minDate = new Date(); // Today
maxDate = new Date();

constructor() {
  // Restrict to next 7 days
  this.maxDate.setDate(this.maxDate.getDate() + 7);
}`;
}
