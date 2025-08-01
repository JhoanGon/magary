import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'magary-tab',
  standalone: true,
  template: `@if (active()) {
    <ng-content />
  }`,
})
export class Tab {
  public label = input<string>('');
  public active = signal(false);
}
