import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Highlight } from 'ngx-highlightjs';
import { MagaryCard, MagaryInput } from 'ng-magary';
import { DemoI18nService } from '../../../../i18n/demo-i18n.service';

const CODE_EXAMPLES = {
  import: `import { MagaryInput } from 'ng-magary';`,
  basic: `<magary-card [width]="'100%'" [shadow]="2" [borderRadius]="'1rem'" [backgroundColor]="'var(--surface-0)'">
  <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
    <magary-input
      [label]="'Name'"
      [placeholder]="'Type your name'"
      [(value)]="inputValue"
    ></magary-input>
  </div>
</magary-card>`,
  types: `<magary-input [type]="'text'" [label]="'Text'" [placeholder]="'Normal text'"></magary-input>
<magary-input [type]="'email'" [label]="'Email'" [placeholder]="'user@email.com'"></magary-input>
<magary-input [type]="'password'" [label]="'Password'" [placeholder]="'********'"></magary-input>
<magary-input [type]="'search'" [label]="'Search'" [placeholder]="'Search...'"></magary-input>`,
  sizes: `<magary-input [size]="'small'" [label]="'Small'" [placeholder]="'Small'"></magary-input>
<magary-input [size]="'normal'" [label]="'Normal'" [placeholder]="'Normal'"></magary-input>
<magary-input [size]="'large'" [label]="'Large'" [placeholder]="'Large'"></magary-input>`,
  variants: `<magary-input [variant]="'outlined'" [label]="'Outlined'" [placeholder]="'Outlined'"></magary-input>
<magary-input [variant]="'filled'" [label]="'Filled'" [placeholder]="'Filled'"></magary-input>
<magary-input [variant]="'underlined'" [label]="'Underlined'" [placeholder]="'Underlined'"></magary-input>`,
  validation: `<magary-input [label]="'Error'" [error]="'Error message'" [value]="'Invalid'"></magary-input>
<magary-input [label]="'Success'" [success]="true" [value]="'Valid'"></magary-input>
<magary-input [label]="'Required'" [required]="true" [placeholder]="'Required field'"></magary-input>`,
  icons: `<magary-input [label]="'Prefix'" [prefixIcon]="'user'" [placeholder]="'User'"></magary-input>
<magary-input [label]="'Suffix'" [suffixIcon]="'search'" [placeholder]="'Search'"></magary-input>
<magary-input [label]="'Both'" [prefixIcon]="'mail'" [suffixIcon]="'check'" [placeholder]="'Email'"></magary-input>
<magary-input [label]="'Loading'" [loading]="true" [placeholder]="'Loading...'"></magary-input>`,
  states: `<magary-input [label]="'Normal'" [placeholder]="'Normal'"></magary-input>
<magary-input [label]="'Disabled'" [disabled]="true" [value]="'Disabled'"></magary-input>
<magary-input [label]="'Read only'" [readonly]="true" [value]="'Read only'"></magary-input>`,
};

@Component({
  selector: 'app-view-input',
  imports: [CommonModule, FormsModule, MagaryInput, MagaryCard, Highlight],
  templateUrl: './view-input.html',
  styleUrl: './view-input.scss',
})
export class ViewInput {
  readonly i18n = inject(DemoI18nService);

  inputValue = signal('');
  emailValue = signal('');
  passwordValue = signal('');
  searchValue = signal('');

  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleTypes = CODE_EXAMPLES.types;
  readonly exampleSizes = CODE_EXAMPLES.sizes;
  readonly exampleVariants = CODE_EXAMPLES.variants;
  readonly exampleValidation = CODE_EXAMPLES.validation;
  readonly exampleIcons = CODE_EXAMPLES.icons;
  readonly exampleStates = CODE_EXAMPLES.states;

  onInputChange(value: string) {
    this.inputValue.set(value);
  }
}
