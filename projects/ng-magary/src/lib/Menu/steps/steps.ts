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

export interface StepsItem {
  label: string;
  icon?: string;
  command?: (event?: {
    originalEvent: Event;
    item: StepsItem;
    index: number;
  }) => void;
  url?: string;
  routerLink?: any;
  queryParams?: { [k: string]: any };
  disabled?: boolean;
  target?: string;
  routerLinkActiveOptions?: any;
  style?: any;
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
  readonly style = input<{ [klass: string]: any } | null | undefined>(null);
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
