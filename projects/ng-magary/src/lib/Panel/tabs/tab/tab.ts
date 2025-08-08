import { Component, input, signal } from '@angular/core';
@Component({
  selector: 'magary-tab',
  standalone: true,
  template: `@if (active()) {
    <ng-content style="width: 100%;" />
  }`,
})
export class MagaryTab {
  public label = input<string>('');
  public active = signal(false);
}
