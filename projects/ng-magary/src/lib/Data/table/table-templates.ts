import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[magaryTemplate]',
  standalone: true,
})
export class MagaryTemplate {
  type = input<string | undefined>(undefined, { alias: 'magaryTemplate' });

  name = input<string | undefined>(undefined);

  constructor(public template: TemplateRef<unknown>) {}

  getType(): string {
    // Support both modern syntax `magaryTemplate="body"` and legacy `name="body"`.
    return this.type() ?? this.name() ?? '';
  }
}
