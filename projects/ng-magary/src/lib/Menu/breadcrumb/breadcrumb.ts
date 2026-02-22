import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import type { IsActiveMatchOptions, UrlTree } from '@angular/router';

type RouterLinkTarget = string | readonly unknown[] | UrlTree | null;
type NavStyleMap = Record<string, string | number | null | undefined>;
type RouterLinkActiveOptions = { exact: boolean } | IsActiveMatchOptions;

export interface BreadcrumbItem {
  label?: string;
  icon?: string;
  command?: (event?: { originalEvent: Event; item: BreadcrumbItem }) => void;
  url?: string;
  routerLink?: RouterLinkTarget;
  queryParams?: Record<string, unknown>;
  disabled?: boolean;
  target?: string;
  routerLinkActiveOptions?: RouterLinkActiveOptions;
  style?: NavStyleMap;
  styleClass?: string;
  fragment?: string;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: Record<string, unknown>;
}

@Component({
  selector: 'magary-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryBreadcrumb {
  readonly model = input<BreadcrumbItem[]>([]);
  readonly home = input<BreadcrumbItem | undefined>(undefined);
  readonly style = input<NavStyleMap | null | undefined>(null);
  readonly styleClass = input<string | undefined>(undefined);

  readonly onItemClick = output<{
    originalEvent: Event;
    item: BreadcrumbItem;
  }>();

  itemClick(event: Event, item: BreadcrumbItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item,
      });
    }

    this.onItemClick.emit({
      originalEvent: event,
      item: item,
    });
  }
}
