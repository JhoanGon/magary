import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  input,
  OnDestroy,
  output,
  signal,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './speed-dial.html',
  styleUrl: './speed-dial.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagarySpeedDial implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private destroyed = false;
  readonly items = input.required<SpeedDialItem[]>();
  readonly icon = input<string>('plus');
  readonly activeIcon = input<string>('x');
  readonly type = input<SpeedDialType>('linear');
  readonly direction = input<SpeedDialDirection>();
  readonly radius = input<number>(80);
  readonly showMask = input<boolean>(false);
  readonly background = input<string | null>(null);
  readonly triggerSize = input<number>(56);
  readonly itemSize = input<number>(40);
  readonly itemGap = input<number>(64);
  readonly closeOnItemSelect = input(true, { transform: booleanAttribute });
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
  readonly triggerStyles = computed(() => {
    const styles: Record<string, string> = {
      '--speed-dial-trigger-size': `${this.triggerSize()}px`,
      '--speed-dial-item-size': `${this.itemSize()}px`,
      '--speed-dial-item-gap': `${this.itemGap()}px`,
    };

    if (this.background()) {
      styles['--trigger-bg'] = this.background() as string;
    }

    return styles;
  });
  readonly itemsStyles = computed(() => ({
    '--item-count': this.itemCount().toString(),
    '--radius': `${this.radius()}px`,
    '--speed-dial-item-size': `${this.itemSize()}px`,
    '--speed-dial-item-gap': `${this.itemGap()}px`,
  }));
  readonly currentIcon = computed(() =>
    this.isOpen() ? this.activeIcon() : this.icon(),
  );

  private emitToggle(state: boolean): void {
    if (!this.destroyed) {
      this.speedDialToggle.emit(state);
    }
  }

  private emitItemSelect(payload: { item: SpeedDialItem; event: Event }): void {
    if (!this.destroyed) {
      this.itemSelect.emit(payload);
    }
  }

  toggleSpeedDial(event: Event): void {
    event.stopPropagation();
    const newState = !this.isOpen();
    this.isOpen.set(newState);
    this.emitToggle(newState);
  }
  onItemClick(event: Event, item: SpeedDialItem): void {
    event.stopPropagation();
    if (item.disabled) {
      return;
    }
    this.emitItemSelect({ item, event });
    if (item.command) {
      item.command(event);
    }
    if (this.closeOnItemSelect()) {
      this.isOpen.set(false);
      this.emitToggle(false);
    }
  }

  itemTransitionDelay(index: number): string {
    const itemTotal = this.itemCount();
    if (itemTotal <= 1) {
      return '0ms';
    }

    const openStep = this.type() === 'linear' ? 34 : 26;
    const closeStep = this.type() === 'linear' ? 22 : 16;

    if (this.isOpen()) {
      return `${index * openStep}ms`;
    }

    const reverseIndex = itemTotal - 1 - index;
    return `${Math.max(reverseIndex, 0) * closeStep}ms`;
  }

  closeMask(): void {
    this.isOpen.set(false);
    this.emitToggle(false);
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
      this.emitToggle(false);
    }
  }
  @HostListener('document:keydown.escape')
  onEscapeKeydown(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.emitToggle(false);
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}
