import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  signal,
  computed,
  inject,
  ChangeDetectorRef,
  input,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from '../api/menu.interface';
import {
  animate,
  style,
  transition,
  trigger,
  query,
  group,
} from '@angular/animations';

@Component({
  selector: 'magary-slidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './slidemenu.html',
  styleUrl: './slidemenu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        query(':enter', [
          style({
            transform: 'translateX(100%)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':leave', [
          style({
            transform: 'translateX(0)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        group([
          query(':leave', [
            animate(
              '300ms ease-out',
              style({ transform: 'translateX(-100%)' }),
            ),
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
      transition(':decrement', [
        query(':enter', [
          style({
            transform: 'translateX(-100%)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':leave', [
          style({
            transform: 'translateX(0)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(100%)' })),
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class MagarySlideMenu {
  model = input<MenuItem[]>([]);
  style = input<{ [klass: string]: any } | null>(null);
  styleClass = input<string>('');
  menuWidth = input<number | string>(300);
  viewportHeight = input<number | string>(400);
  viewStack = signal<MenuItem[][]>([]);
  currentIndex = signal<number>(0);

  private cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(
      () => {
        if (this.viewStack().length === 0 && this.model().length > 0) {
          this.viewStack.set([this.model()]);
        }
      },
      { allowSignalWrites: true },
    );
  }

  get currentItems() {
    const stack = this.viewStack();
    const index = this.currentIndex();
    return stack[index] || [];
  }

  headerStack = signal<string[]>(['Main']);

  get currentHeader() {
    return this.headerStack()[this.currentIndex()];
  }

  onItemClick(event: Event, item: MenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    if (item.items) {
      this.viewStack.update((stack) => [...stack, item.items!]);
      this.headerStack.update((stack) => [...stack, item.label || 'Submenu']);
      this.currentIndex.update((i) => i + 1);
    }
  }

  goBack() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      setTimeout(() => {
        this.viewStack.update((stack) =>
          stack.slice(0, this.currentIndex() + 1),
        );
        this.headerStack.update((stack) =>
          stack.slice(0, this.currentIndex() + 1),
        );
      }, 300);
    }
  }

  containerStyle() {
    return {
      width:
        typeof this.menuWidth() === 'number'
          ? this.menuWidth() + 'px'
          : this.menuWidth(),
      height:
        typeof this.viewportHeight() === 'number'
          ? this.viewportHeight() + 'px'
          : this.viewportHeight(),
      ...this.style(),
    };
  }
}
