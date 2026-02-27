import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnDestroy,
  viewChild,
  viewChildren,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItem } from '../../Menu/api/menu.interface'; // Use api interface

@Component({
  selector: 'magary-split-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './split-button.html',
  styleUrl: './split-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagarySplitButton implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private dropdownTriggerRef =
    viewChild<ElementRef<HTMLButtonElement>>('dropdownTrigger');
  private menuItemButtonRefs =
    viewChildren<ElementRef<HTMLButtonElement>>('menuItemButton');

  readonly label = input<string>('Save');
  readonly icon = input<string>();
  readonly iconSize = input<number>(18);
  readonly model = input<MenuItem[]>([]); // Items for the dropdown
  readonly disabled = input<boolean>(false);
  readonly styleClass = input<string>('');
  readonly backgroundColor = input<string | null>(null);
  readonly textColor = input<string | null>(null);
  readonly severity = input<
    'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'
  >('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly menuPosition = input<'start' | 'end'>('start');
  readonly menuAriaLabel = input<string | null>(null);
  readonly closeOnItemSelect = input(true, { transform: booleanAttribute });

  // Events
  readonly onClick = output<MouseEvent>();
  readonly onDropdownClick = output<MouseEvent>();
  readonly itemClick = output<{ item: MenuItem; originalEvent: MouseEvent }>();

  readonly isOpen = signal(false);
  private pendingFocusTimeout: ReturnType<typeof setTimeout> | null = null;
  readonly hostClasses = computed(() =>
    [
      'magary-split-button',
      `severity-${this.severity()}`,
      this.size() === 'md' ? '' : `size-${this.size()}`,
      this.styleClass().trim(),
      this.disabled() ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
  readonly hostStyles = computed<Record<string, string>>(() => {
    const styles: Record<string, string> = {};
    const backgroundColor = this.backgroundColor()?.trim();
    const textColor = this.textColor()?.trim();

    if (backgroundColor) {
      styles['--split-button-bg'] = backgroundColor;
    }

    if (textColor) {
      styles['--split-button-text'] = textColor;
    }

    return styles;
  });

  toggleDropdown(event: MouseEvent): void {
    if (this.disabled()) return;
    event.stopPropagation();
    const nextState = !this.isOpen();
    this.isOpen.set(nextState);
    if (nextState) {
      this.focusMenuItemByIndex(0, true);
    }
    this.onDropdownClick.emit(event);
  }

  onDefaultClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.onClick.emit(event);
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
      }
      this.focusMenuItemByIndex(0, true);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.isOpen()) {
        this.isOpen.set(true);
      }
      this.focusMenuItemByIndex(this.getMenuButtons().length - 1, true);
    }
  }

  onMenuItemKeydown(event: KeyboardEvent, index: number): void {
    const buttons = this.getMenuButtons();
    if (!buttons.length) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusMenuItemByIndex(this.findEnabledIndex(buttons, index + 1, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusMenuItemByIndex(this.findEnabledIndex(buttons, index - 1, -1));
        break;
      case 'Home':
        event.preventDefault();
        this.focusMenuItemByIndex(this.findFirstEnabledIndex(buttons));
        break;
      case 'End':
        event.preventDefault();
        this.focusMenuItemByIndex(this.findLastEnabledIndex(buttons));
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown(true);
        break;
      case 'Tab':
        this.closeDropdown();
        break;
      default:
        break;
    }
  }

  onItemClick(event: MouseEvent, item: MenuItem): void {
    if (item.disabled) {
      event.stopPropagation();
      return;
    }

    this.itemClick.emit({ item, originalEvent: event });

    // Execute command if exists
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (this.closeOnItemSelect()) {
      this.closeDropdown();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.isOpen() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeDropdown(true);
    }
  }

  ngOnDestroy(): void {
    if (this.pendingFocusTimeout !== null) {
      clearTimeout(this.pendingFocusTimeout);
      this.pendingFocusTimeout = null;
    }
  }

  private closeDropdown(focusTrigger = false): void {
    this.isOpen.set(false);
    if (focusTrigger) {
      this.focusTrigger();
    }
  }

  private focusTrigger(): void {
    this.dropdownTriggerRef()?.nativeElement.focus();
  }

  private getMenuButtons(): HTMLButtonElement[] {
    return this.menuItemButtonRefs().map((ref) => ref.nativeElement);
  }

  private focusMenuItemByIndex(index: number, defer = false): void {
    const focus = () => {
      const buttons = this.getMenuButtons();
      if (!buttons.length) {
        return;
      }

      const safeIndex = Math.min(Math.max(index, 0), buttons.length - 1);
      const enabledIndex = this.findEnabledIndex(buttons, safeIndex, 1);
      if (enabledIndex === -1) {
        return;
      }

      buttons[enabledIndex].focus();
    };

    if (defer) {
      if (this.pendingFocusTimeout !== null) {
        clearTimeout(this.pendingFocusTimeout);
      }
      this.pendingFocusTimeout = setTimeout(() => {
        this.pendingFocusTimeout = null;
        focus();
      });
      return;
    }

    focus();
  }

  private findEnabledIndex(
    buttons: HTMLButtonElement[],
    startIndex: number,
    direction: 1 | -1,
  ): number {
    const total = buttons.length;
    if (!total) {
      return -1;
    }

    let index = ((startIndex % total) + total) % total;
    for (let i = 0; i < total; i++) {
      const candidate = buttons[index];
      if (!candidate.disabled) {
        return index;
      }
      index = (index + direction + total) % total;
    }

    return -1;
  }

  private findFirstEnabledIndex(buttons: HTMLButtonElement[]): number {
    return buttons.findIndex((button) => !button.disabled);
  }

  private findLastEnabledIndex(buttons: HTMLButtonElement[]): number {
    for (let i = buttons.length - 1; i >= 0; i--) {
      if (!buttons[i].disabled) {
        return i;
      }
    }
    return -1;
  }
}
