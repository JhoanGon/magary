import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'magary-tab',
  standalone: true,
  host: {
    '[class.magary-tab-active]': 'active()',
    role: 'tabpanel',
    '[attr.id]': 'panelId() || null',
    '[attr.aria-labelledby]': 'labelledBy() || null',
    '[attr.aria-hidden]': '!active()',
  },
  template: `@if (active()) {
    <div class="tab-panel">
      <ng-content />
    </div>
  }`,
  styles: `
    :host {
      display: none;
      min-width: 0;
      flex: 0 0 var(--tab-panel-width, 100%);
    }

    :host(.magary-tab-active) {
      display: block;
    }

    .tab-panel {
      width: 100%;
      min-width: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryTab {
  public label = input<string>('');
  public active = signal(false);
  public panelId = signal('');
  public labelledBy = signal('');
}
