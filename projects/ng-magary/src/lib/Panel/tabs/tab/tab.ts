import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
@Component({
  selector: 'magary-tab',
  standalone: true,
  template: `@if (active()) {
    <ng-content style="width: 100%;" />
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagaryTab {
  public label = input<string>('');
  public active = signal(false);
}
