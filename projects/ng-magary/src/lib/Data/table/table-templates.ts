import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[magaryTemplate]',
  standalone: true,
})
export class MagaryTemplate {
  @Input('magaryTemplate') type: string | undefined;

  @Input() name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }
}
