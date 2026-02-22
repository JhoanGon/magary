import { CommonModule } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  contentChild,
  TemplateRef,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import type { IsActiveMatchOptions, UrlTree } from '@angular/router';

type RouterLinkTarget = string | readonly unknown[] | UrlTree | null;
type NavStyleMap = Record<string, string | number | null | undefined>;
type RouterLinkActiveOptions = { exact: boolean } | IsActiveMatchOptions;

export interface StepsItem {
  label: string;
  icon?: string;
  command?: (event?: {
    originalEvent: Event;
    item: StepsItem;
    index: number;
  }) => void;
  url?: string;
  routerLink?: RouterLinkTarget;
  queryParams?: Record<string, unknown>;
  disabled?: boolean;
  target?: string;
  routerLinkActiveOptions?: RouterLinkActiveOptions;
  style?: NavStyleMap;
  styleClass?: string;
}

@Component({
  selector: 'magary-steps',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './steps.html',
  styleUrls: ['./steps.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagarySteps {
  readonly model = input<StepsItem[]>([]);
  readonly activeIndex = input<number>(0);
  readonly readonly = input<boolean>(true);
  readonly style = input<NavStyleMap | null | undefined>(null);
  readonly styleClass = input<string | undefined>(undefined);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  // Content Template
  readonly template = contentChild(TemplateRef);

  readonly activeIndexChange = output<number>();

  readonly rootClass = computed(() => {
    return {
      'magary-steps': true,
      'magary-steps-vertical': this.orientation() === 'vertical',
      'magary-steps-horizontal': this.orientation() === 'horizontal',
      [this.styleClass() || '']: !!this.styleClass(),
    };
  });

  onItemClick(event: Event, item: StepsItem, i: number) {
    if (this.readonly() || item.disabled) {
      event.preventDefault();
      return;
    }

    this.activeIndexChange.emit(i);

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item,
        index: i,
      });
    }
  }

  isStepActive(index: number): boolean {
    return this.activeIndex() === index;
  }
}
