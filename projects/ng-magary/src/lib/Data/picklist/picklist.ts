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
  computed,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MagaryButton } from '../../Button/button/button';

@Component({
  selector: 'magary-pick-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MagaryButton],
  templateUrl: './picklist.html',
  styleUrl: './picklist.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'magary-pick-list',
  },
})
export class MagaryPickList {
  // Inputs
  @Input() sourceHeader: string = 'Source';
  @Input() targetHeader: string = 'Target';
  @Input() sourceStyle: { [klass: string]: any } | null = null;
  @Input() targetStyle: { [klass: string]: any } | null = null;
  @Input() showSourceControls: boolean = true;
  @Input() showTargetControls: boolean = true;

  // Data Models
  source = model<any[]>([]);
  target = model<any[]>([]);

  // Selection
  selectedSource = signal<any[]>([]);
  selectedTarget = signal<any[]>([]);

  // Templates
  itemTemplate = contentChild<TemplateRef<any>>('itemTemplate');

  // Outputs
  @Output() onMoveToTarget = new EventEmitter<any>();
  @Output() onMoveToSource = new EventEmitter<any>();
  @Output() onMoveAllToTarget = new EventEmitter<any>();
  @Output() onMoveAllToSource = new EventEmitter<any>();

  // Methods
  moveRight() {
    const selected = this.selectedSource();
    if (selected.length === 0) return;

    const source = [...this.source()];
    const target = [...this.target()];

    // Remove from source, add to target
    const newSource = source.filter((item) => !selected.includes(item));
    const newTarget = [...target, ...selected];

    this.source.set(newSource);
    this.target.set(newTarget);
    this.selectedSource.set([]);

    this.onMoveToTarget.emit({ items: selected });
  }

  moveAllRight() {
    const source = [...this.source()];
    if (source.length === 0) return;

    const target = [...this.target(), ...source];

    this.source.set([]);
    this.target.set(target);
    this.selectedSource.set([]);

    this.onMoveAllToTarget.emit({ items: source });
  }

  moveLeft() {
    const selected = this.selectedTarget();
    if (selected.length === 0) return;

    const source = [...this.source()];
    const target = [...this.target()];

    // Remove from target, add to source
    const newTarget = target.filter((item) => !selected.includes(item));
    const newSource = [...source, ...selected];

    this.target.set(newTarget);
    this.source.set(newSource);
    this.selectedTarget.set([]);

    this.onMoveToSource.emit({ items: selected });
  }

  moveAllLeft() {
    const target = [...this.target()];
    if (target.length === 0) return;

    const source = [...this.source(), ...target];

    this.target.set([]);
    this.source.set(source);
    this.selectedTarget.set([]);

    this.onMoveAllToSource.emit({ items: target });
  }

  onSourceItemClick(event: MouseEvent, item: any) {
    const metaKey = event.metaKey || event.ctrlKey;
    const selected = [...this.selectedSource()];
    const index = selected.indexOf(item);

    if (metaKey) {
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(item);
      }
    } else {
      // Simple selection for now, maybe add shift key support later
      if (index > -1 && selected.length === 1) {
        this.selectedSource.set([]);
        return;
      }
      this.selectedSource.set([item]);
      return;
    }
    this.selectedSource.set(selected);
  }

  onTargetItemClick(event: MouseEvent, item: any) {
    const metaKey = event.metaKey || event.ctrlKey;
    const selected = [...this.selectedTarget()];
    const index = selected.indexOf(item);

    if (metaKey) {
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(item);
      }
    } else {
      if (index > -1 && selected.length === 1) {
        this.selectedTarget.set([]);
        return;
      }
      this.selectedTarget.set([item]);
      return;
    }
    this.selectedTarget.set(selected);
  }
}
