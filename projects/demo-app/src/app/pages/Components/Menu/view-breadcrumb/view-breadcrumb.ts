import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MagaryBreadcrumb,
  MagaryCard,
  MagaryTabs,
  MagaryTab,
  BreadcrumbItem,
} from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'view-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    MagaryBreadcrumb,
    MagaryCard,
    MagaryTabs,
    MagaryTab,
    Highlight,
  ],
  templateUrl: './view-breadcrumb.html',
  styleUrls: ['./view-breadcrumb.scss'],
})
export class ViewBreadcrumb implements OnInit {
  items: BreadcrumbItem[] = [];
  house: BreadcrumbItem | undefined;

  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
  };

  ngOnInit() {
    this.items = [
      { label: 'Computer' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Backpacks' },
      { label: 'Item' },
    ];

    this.house = { icon: 'house', url: '/' };
  }

  exampleHTML = `
<magary-breadcrumb [model]="items" [house]="house"></magary-breadcrumb>
`;

  exampleTS = `
import { BreadcrumbItem } from 'ng-magary';

export class ViewBreadcrumb implements OnInit {
    items: BreadcrumbItem[] | undefined;
    house: BreadcrumbItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Computer' },
            { label: 'Notebook' },
            { label: 'Accessories' },
            { label: 'Backpacks' },
            { label: 'Item' }
        ];

        this.house = { icon: 'house', url: '/' };
    }
}
`;
}
