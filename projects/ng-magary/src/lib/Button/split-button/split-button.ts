import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
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
    this.isOpen.update((v) => !v);
    this.onDropdownClick.emit(event);
  }

  onDefaultClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.onClick.emit(event);
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
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.isOpen() &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }
  }
}
