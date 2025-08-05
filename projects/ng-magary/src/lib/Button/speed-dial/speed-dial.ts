import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { SpeedDialItem } from './speed-dial-item.interface';

@Component({
  selector: 'magary-speed-dial',
  imports: [CommonModule],
  templateUrl: './speed-dial.html',
  styleUrl: './speed-dial.scss',
})
export class MagarySpeedDial {
  public items = input.required<SpeedDialItem[]>();
  public icon = input<string>('fas fa-plus');
  public activeIcon = input<string>('fas fa-times');
  public type = input<'linear' | 'circle' | 'semicircle' | 'quartercircle'>(
    'linear',
  );

  public direction = input<
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'up-left'
    | 'up-right'
    | 'down-left'
    | 'down-right'
  >();

  public radius = input<number>(80);
  public showMask = input<boolean>(false);
  public isOpen = signal(false);
  public background = input<string>('#007bff');
  public itemCount = computed(() => this.items().length);
  public toggle(event: Event): void {
    event.stopPropagation();
    this.isOpen.update((open) => !open);
  }

  public onItemClick(event: Event, item: SpeedDialItem): void {
    if (item.command) {
      item.command(event);
    }
    this.isOpen.set(false);
  }
}
