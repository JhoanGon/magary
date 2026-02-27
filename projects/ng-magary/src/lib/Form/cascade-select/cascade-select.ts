import {
  Component,
  ChangeDetectionStrategy,
  booleanAttribute,
  input,
  signal,
  forwardRef,
  ElementRef,
  HostListener,
  inject,
  computed,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

type CascadeSelectOption = Record<string, unknown>;
type CascadeSelectSize = 'small' | 'normal' | 'large';
type CascadePath = number[];

interface CascadeVisibleNode {
  option: CascadeSelectOption;
  path: CascadePath;
  key: string;
  depth: number;
  isGroup: boolean;
  selectable: boolean;
}

@Component({
  selector: 'magary-cascade-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cascade-select.html',
  styleUrl: './cascade-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MagaryCascadeSelect),
      multi: true,
    },
  ],
})
export class MagaryCascadeSelect implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly uniqueId = `magary-cascade-select-${Math.random().toString(36).substring(2, 11)}`;
  readonly triggerId = `${this.uniqueId}-trigger`;
  readonly listboxId = `${this.uniqueId}-listbox`;
  readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  public options = input<CascadeSelectOption[]>([]);
  public optionLabel = input<string>('label');
  public optionValue = input<string | null>(null);
  public optionGroupLabel = input<string[] | string | null>(null);
  public optionGroupChildren = input<string[]>(['children']);
  public placeholder = input<string>('Select an option');
  public size = input<CascadeSelectSize>('normal');
  public loading = input(false, { transform: booleanAttribute });
  public invalid = input(false, { transform: booleanAttribute });
  public error = input<string>('');
  public helpText = input<string>('');
  // Input externo: [disabled]="true"
  protected disabledInput = input<boolean>(false, { alias: 'disabled' });
  public width = input<string>('100%');
  public optionGroupSelectable = input<boolean>(false);

  // Signal interno: setDisabledState(true) desde Reactive Forms
  private _disabled = signal<boolean>(false);

  // Computed que combina ambos (OR logico)
  public disabled = computed(() => this._disabled() || this.disabledInput());
  public isInteractionDisabled = computed(() => this.disabled() || this.loading());
  public resolvedAriaLabel = computed(() => {
    const placeholder = this.placeholder().trim();
    return placeholder.length > 0 ? placeholder : 'Select option';
  });
  public hasError = computed(() => this.invalid() || this.error().trim().length > 0);
  public errorMessage = computed(() => {
    const message = this.error().trim();
    return message.length > 0 ? message : 'Invalid selection';
  });
  public errorMessageId = `${this.uniqueId}-error`;
  public helpMessageId = `${this.uniqueId}-help`;
  public describedBy = computed(() => {
    if (this.hasError()) {
      return this.errorMessageId;
    }

    if (this.helpText().trim().length > 0) {
      return this.helpMessageId;
    }

    return null;
  });

  public isOpen = signal(false);
  public value = signal<unknown>(null);
  public activePathKey = signal<string | null>(null);
  private expandedGroupKeys = signal<string[]>([]);

  public activeDescendantId = computed(() => {
    if (!this.isOpen()) {
      return null;
    }

    const key = this.activePathKey();
    if (!key) {
      return null;
    }

    const exists = this.visibleNodes().some((node) => node.key === key);
    if (!exists) {
      return null;
    }

    return this.getOptionIdFromKey(key);
  });

  public visibleNodes = computed(() => {
    const expanded = new Set(this.expandedGroupKeys());
    return this.buildVisibleNodes(this.options(), [], 0, expanded);
  });

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  public selectedLabel = computed(() => {
    const val = this.value();
    if (val === null || val === undefined || val === '') {
      return this.placeholder();
    }

    const findLabel = (opts: CascadeSelectOption[]): string | null => {
      for (const opt of opts) {
        if (this.getOptionValue(opt) === val) {
          return this.getOptionLabel(opt);
        }
        const children = this.getOptionChildren(opt);
        if (children && children.length > 0) {
          const found = findLabel(children);
          if (found) return found;
        }
      }
      return null;
    };

    return findLabel(this.options()) || this.placeholder();
  });

  public getOptionLabel(option: CascadeSelectOption): string {
    if (this.isOptionGroup(option)) {
      const groupLabel = this.optionGroupLabel();
      if (groupLabel && typeof groupLabel === 'string') {
        return String(option[groupLabel] ?? '');
      }
    }
    return String(option[this.optionLabel()] ?? '');
  }

  public getOptionValue(option: CascadeSelectOption): unknown {
    const valueKey = this.optionValue();
    return valueKey ? option[valueKey] : option;
  }

  public getOptionChildren(option: CascadeSelectOption): CascadeSelectOption[] | null {
    for (const childKey of this.optionGroupChildren()) {
      const children = option[childKey];
      if (Array.isArray(children)) {
        return children as CascadeSelectOption[];
      }
    }
    return null;
  }

  public isOptionGroup(option: CascadeSelectOption): boolean {
    const children = this.getOptionChildren(option);
    return !!children && children.length > 0;
  }

  public toggle() {
    if (this.isInteractionDisabled()) return;
    if (this.isOpen()) {
      this.closePanel();
      return;
    }

    this.openPanel();
  }

  public selectOption(
    option: CascadeSelectOption,
    event?: Event,
    path: CascadePath = [],
  ) {
    if (this.isInteractionDisabled()) {
      return;
    }

    event?.stopPropagation();

    const isGroup = this.isOptionGroup(option);
    if (isGroup && !this.optionGroupSelectable()) {
      if (path.length > 0) {
        this.toggleGroup(path);
        this.setActivePath(this.pathToKey(path));
      }
      return;
    }

    this.applySelection(option);
  }

  public onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isInteractionDisabled()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openPanel();
        } else {
          this.moveActive(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openPanel(true);
        } else {
          this.moveActive(-1);
        }
        break;
      case 'Home':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openPanel();
        }
        this.setActiveToEdge('start');
        break;
      case 'End':
        event.preventDefault();
        if (!this.isOpen()) {
          this.openPanel(true);
        }
        this.setActiveToEdge('end');
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.closePanel();
        }
        break;
      case 'Tab':
        if (this.isOpen()) {
          this.closePanel();
        }
        break;
      default:
        break;
    }
  }

  public onPanelKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.isInteractionDisabled()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.setActiveToEdge('start');
        break;
      case 'End':
        event.preventDefault();
        this.setActiveToEdge('end');
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.expandActiveGroup();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.collapseToParent();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.activateActiveOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.closePanel();
        this.focusTrigger();
        break;
      case 'Tab':
        this.closePanel();
        break;
      default:
        break;
    }
  }

  public createPath(
    parentPath: ReadonlyArray<number> | null | undefined,
    index: number,
  ): CascadePath {
    return [...(parentPath ?? []), index];
  }

  public getOptionId(path: CascadePath): string {
    return this.getOptionIdFromKey(this.pathToKey(path));
  }

  public isPathActive(path: CascadePath): boolean {
    return this.activePathKey() === this.pathToKey(path);
  }

  public isGroupExpanded(path: CascadePath): boolean {
    return this.expandedGroupKeys().includes(this.pathToKey(path));
  }

  public isSelectableOption(option: CascadeSelectOption): boolean {
    return !this.isOptionGroup(option) || this.optionGroupSelectable();
  }

  public onOptionMouseEnter(option: CascadeSelectOption, path: CascadePath): void {
    const key = this.pathToKey(path);
    this.setActivePath(key);

    if (this.isOptionGroup(option)) {
      this.expandGroup(path);
    } else {
      this.expandAncestors(path);
    }
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    if (!this.isOpen()) {
      return;
    }

    this.closePanel();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target as Node | null)) {
      this.closePanel();
    }
  }

  writeValue(obj: unknown): void {
    this.value.set(obj);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  private openPanel(preferLast = false): void {
    this.isOpen.set(true);

    const selectedPath = this.findPathByValue(this.options(), this.value());
    if (selectedPath) {
      this.expandAncestors(selectedPath);
      this.setActivePath(this.pathToKey(selectedPath));
    } else {
      this.expandedGroupKeys.set([]);
      const nodes = this.visibleNodes();
      if (nodes.length === 0) {
        this.setActivePath(null);
      } else {
        const target = preferLast ? nodes[nodes.length - 1] : nodes[0];
        this.setActivePath(target.key);
      }
    }

    queueMicrotask(() => {
      this.panelRef()?.nativeElement.focus();
    });
  }

  private applySelection(option: CascadeSelectOption): void {
    const val = this.getOptionValue(option);
    this.value.set(val);
    this.onChange(val);
    this.closePanel();
  }

  private activateActiveOption(): void {
    const activeNode = this.getActiveNode();
    if (!activeNode) {
      return;
    }

    if (activeNode.isGroup && !this.optionGroupSelectable()) {
      this.expandGroup(activeNode.path);
      const children = this.getOptionChildren(activeNode.option);
      if (children && children.length > 0) {
        this.setActivePath(this.pathToKey([...activeNode.path, 0]));
      }
      return;
    }

    this.applySelection(activeNode.option);
  }

  private moveActive(step: 1 | -1): void {
    const nodes = this.visibleNodes();
    if (nodes.length === 0) {
      this.setActivePath(null);
      return;
    }

    const currentKey = this.activePathKey();
    const currentIndex = nodes.findIndex((node) => node.key === currentKey);

    if (currentIndex === -1) {
      const target = step > 0 ? nodes[0] : nodes[nodes.length - 1];
      this.setActivePath(target.key);
      return;
    }

    const nextIndex = (currentIndex + step + nodes.length) % nodes.length;
    this.setActivePath(nodes[nextIndex].key);
  }

  private setActiveToEdge(edge: 'start' | 'end'): void {
    const nodes = this.visibleNodes();
    if (nodes.length === 0) {
      this.setActivePath(null);
      return;
    }

    this.setActivePath(edge === 'start' ? nodes[0].key : nodes[nodes.length - 1].key);
  }

  private expandActiveGroup(): void {
    const activeNode = this.getActiveNode();
    if (!activeNode || !activeNode.isGroup) {
      return;
    }

    const children = this.getOptionChildren(activeNode.option);
    if (!children || children.length === 0) {
      return;
    }

    if (!this.isGroupExpanded(activeNode.path)) {
      this.expandGroup(activeNode.path);
      return;
    }

    this.setActivePath(this.pathToKey([...activeNode.path, 0]));
  }

  private collapseToParent(): void {
    const activeNode = this.getActiveNode();
    if (!activeNode) {
      return;
    }

    if (activeNode.isGroup && this.isGroupExpanded(activeNode.path)) {
      this.collapseGroup(activeNode.path);
      return;
    }

    if (activeNode.path.length <= 1) {
      return;
    }

    const parentPath = activeNode.path.slice(0, -1);
    this.setActivePath(this.pathToKey(parentPath));
  }

  private getActiveNode(): CascadeVisibleNode | null {
    const key = this.activePathKey();
    if (!key) {
      return null;
    }

    return this.visibleNodes().find((node) => node.key === key) ?? null;
  }

  private expandGroup(path: CascadePath): void {
    const newKeys = [...this.expandedGroupKeys(), this.pathToKey(path)];
    this.expandedGroupKeys.set(this.uniqueKeys(newKeys));
  }

  private expandAncestors(path: CascadePath): void {
    if (path.length <= 1) {
      return;
    }

    const keys = [...this.expandedGroupKeys()];
    for (let i = 1; i < path.length; i++) {
      keys.push(this.pathToKey(path.slice(0, i)));
    }

    this.expandedGroupKeys.set(this.uniqueKeys(keys));
  }

  private toggleGroup(path: CascadePath): void {
    if (this.isGroupExpanded(path)) {
      this.collapseGroup(path);
      return;
    }

    this.expandGroup(path);
  }

  private collapseGroup(path: CascadePath): void {
    const prefix = this.pathToKey(path);
    this.expandedGroupKeys.set(
      this.expandedGroupKeys().filter(
        (key) => key !== prefix && !key.startsWith(`${prefix}-`),
      ),
    );
  }

  private setActivePath(key: string | null): void {
    this.activePathKey.set(key);
    if (!key) {
      return;
    }

    queueMicrotask(() => {
      const optionId = this.getOptionIdFromKey(key);
      const optionElement = document.getElementById(optionId);
      if (
        optionElement &&
        this.elementRef.nativeElement.contains(optionElement)
        && typeof optionElement.scrollIntoView === 'function'
      ) {
        optionElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  private focusTrigger(): void {
    const triggerElement = document.getElementById(this.triggerId);
    if (
      triggerElement &&
      this.elementRef.nativeElement.contains(triggerElement)
    ) {
      (triggerElement as HTMLElement).focus();
    }
  }

  private pathToKey(path: CascadePath): string {
    return path.join('-');
  }

  private getOptionIdFromKey(key: string): string {
    return `${this.listboxId}-option-${key}`;
  }

  private uniqueKeys(keys: string[]): string[] {
    return Array.from(new Set(keys));
  }

  private buildVisibleNodes(
    items: CascadeSelectOption[],
    parentPath: CascadePath,
    depth: number,
    expanded: Set<string>,
  ): CascadeVisibleNode[] {
    const nodes: CascadeVisibleNode[] = [];

    items.forEach((option, index) => {
      const path = [...parentPath, index];
      const key = this.pathToKey(path);
      const isGroup = this.isOptionGroup(option);
      nodes.push({
        option,
        path,
        key,
        depth,
        isGroup,
        selectable: !isGroup || this.optionGroupSelectable(),
      });

      const children = this.getOptionChildren(option);
      if (isGroup && children && children.length > 0 && expanded.has(key)) {
        nodes.push(...this.buildVisibleNodes(children, path, depth + 1, expanded));
      }
    });

    return nodes;
  }

  private findPathByValue(
    options: CascadeSelectOption[],
    targetValue: unknown,
    parentPath: CascadePath = [],
  ): CascadePath | null {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      const path = [...parentPath, index];

      if (Object.is(this.getOptionValue(option), targetValue)) {
        return path;
      }

      const children = this.getOptionChildren(option);
      if (children && children.length > 0) {
        const childPath = this.findPathByValue(children, targetValue, path);
        if (childPath) {
          return childPath;
        }
      }
    }

    return null;
  }

  private closePanel(): void {
    this.isOpen.set(false);
    this.activePathKey.set(null);
    this.expandedGroupKeys.set([]);
    this.onTouched();
  }
}
