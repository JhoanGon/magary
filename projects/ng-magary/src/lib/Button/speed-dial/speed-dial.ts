import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  signal,
  ElementRef,
  HostListener,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SpeedDialItem } from './speed-dial-item.interface';
type SpeedDialType = 'linear' | 'circle' | 'semicircle' | 'quartercircle';
type SpeedDialDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';
@Component({
  selector: 'magary-speed-dial',
  imports: [CommonModule],
  templateUrl: './speed-dial.html',
  styleUrl: './speed-dial.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagarySpeedDial {
  private readonly elementRef = inject(ElementRef);
  readonly items = input.required<SpeedDialItem[]>();
  readonly icon = input<string>('fas fa-plus');
  readonly activeIcon = input<string>('fas fa-times');
  readonly type = input<SpeedDialType>('linear');
  readonly direction = input<SpeedDialDirection>();
  readonly radius = input<number>(80);
  readonly showMask = input<boolean>(false);
  readonly background = input<string>('#007bff');
  readonly ariaLabel = input<string>('Speed dial menu');
  readonly isOpen = signal(false);
  readonly speedDialToggle = output<boolean>();
  readonly itemSelect = output<{ item: SpeedDialItem; event: Event }>();
  readonly itemCount = computed(() => this.items().length);
  readonly containerClasses = computed(() =>
    [
      'speed-dial-container',
      this.isOpen() ? 'is-open' : '',
      `type-${this.type()}`,
      this.direction() ? `direction-${this.direction()}` : '',
    ].filter(Boolean),
  );
  readonly triggerStyles = computed(() => ({
    '--trigger-bg': this.background(),
  }));
  readonly itemsStyles = computed(() => ({
    '--item-count': this.itemCount().toString(),
    '--radius': `${this.radius()}px`,
  }));
  readonly currentIcon = computed(() =>
    this.isOpen() ? this.activeIcon() : this.icon(),
  );
  toggleSpeedDial(event: Event): void {
    event.stopPropagation();
    const newState = !this.isOpen();
    this.isOpen.set(newState);
    this.speedDialToggle.emit(newState);
  }
  onItemClick(event: Event, item: SpeedDialItem): void {
    event.stopPropagation();
    if (item.disabled) {
      return;
    }
    this.itemSelect.emit({ item, event });
    if (item.command) {
      item.command(event);
    }
    this.isOpen.set(false);
    this.speedDialToggle.emit(false);
  }
  closeMask(): void {
    this.isOpen.set(false);
    this.speedDialToggle.emit(false);
  }
  trackByItem(index: number, item: SpeedDialItem): string {
    return item.id || `${item.icon}-${index}`;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen()) {
      return;
    }
    const target = event.target as HTMLElement;
    const componentElement = this.elementRef.nativeElement;
    if (!componentElement.contains(target)) {
      this.isOpen.set(false);
      this.speedDialToggle.emit(false);
    }
  }
  @HostListener('document:keydown.escape')
  onEscapeKeydown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.speedDialToggle.emit(false);
    }
  }
}
