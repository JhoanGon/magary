import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
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
export class MagarySplitButton {
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

  // Events
  readonly onClick = output<MouseEvent>();
  readonly onDropdownClick = output<MouseEvent>();

  readonly isOpen = signal(false);

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

    // Execute command if exists
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    // Close dropdown
    this.closeDropdown();
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
      setTimeout(focus);
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
