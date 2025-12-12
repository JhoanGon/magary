import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  signal,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryButton } from '../../Button/button/button';

@Component({
  selector: 'magary-order-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MagaryButton],
  templateUrl: './orderlist.html',
  styleUrl: './orderlist.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-order-list',
  },
})
export class MagaryOrderList {
  @Input() header: string | null = null;
  @Input() listStyle: { [klass: string]: any } | null = null;

  // Data
  value = model<any[]>([]);
  selection = model<any[]>([]);

  // Templates
  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');

  // Outputs
  @Output() onReorder = new EventEmitter<any>();
  @Output() onSelectionChange = new EventEmitter<any>();

  onItemClick(event: MouseEvent, item: any, index: number) {
    const metaKey = event.metaKey || event.ctrlKey;
    let selected = [...this.selection()];

    if (metaKey) {
      if (selected.includes(item)) {
        selected = selected.filter((i) => i !== item);
      } else {
        selected.push(item);
      }
    } else {
      if (selected.includes(item) && selected.length === 1) {
        this.selection.set([]);
        this.onSelectionChange.emit(this.selection());
        return;
      }
      selected = [item];
    }
    this.selection.set(selected);
    this.onSelectionChange.emit(this.selection());
  }

  moveUp() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index > 0) {
        list[index] = list[index - 1];
        list[index - 1] = item;
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveTop() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = selected.length - 1; i >= 0; i--) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index > 0) {
        list.splice(index, 1);
        list.unshift(item);
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveDown() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    // Process in reverse order for moving down correctly
    for (let i = selected.length - 1; i >= 0; i--) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index < list.length - 1) {
        const nextItem = list[index + 1];
        list[index + 1] = item;
        list[index] = nextItem;
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }

  moveBottom() {
    const selected = this.selection();
    if (selected.length === 0) return;

    let list = [...this.value()];
    for (let i = 0; i < selected.length; i++) {
      const item = selected[i];
      const index = list.indexOf(item);
      if (index < list.length - 1) {
        list.splice(index, 1);
        list.push(item);
      }
    }
    this.value.set(list);
    this.onReorder.emit(list);
  }
}
