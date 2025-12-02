import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagaryButton, MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

const CODE_EXAMPLES = {
  import: `import { MagaryButton } from 'ng-magary';`,
  basic: `<magary-card [width]="'100%'" [shadow]="2" [borderRadius]="'1rem'" [backgroundColor]="'var(--surface-0)'">
  <div style="padding: 1rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
    <magary-button label="Button"></magary-button>
    <magary-button label="Home" icon="fas fa-home"></magary-button>
    <magary-button icon="fas fa-heart"></magary-button>
    <magary-button label="Loading..." [loading]="true"></magary-button>
  </div>
</magary-card>`,
  severity: `<magary-button label="Primary" severity="primary"></magary-button>
<magary-button label="Secondary" severity="secondary"></magary-button>
<magary-button label="Success" severity="success"></magary-button>
<magary-button label="Info" severity="info"></magary-button>
<magary-button label="Warning" severity="warning"></magary-button>
<magary-button label="Danger" severity="danger"></magary-button>
<magary-button label="Help" severity="help"></magary-button>`,
  sizes: `<magary-button label="Small" size="small" severity="primary"></magary-button>
<magary-button label="Normal" size="normal" severity="primary"></magary-button>
<magary-button label="Large" size="large" severity="primary"></magary-button>`,
  variants: `<magary-button label="Solid" variant="solid"></magary-button>
<magary-button label="Outlined" variant="outlined" severity="primary"></magary-button>
<magary-button label="Text" variant="text" severity="primary"></magary-button>`,
  custom: `<magary-button label="Shadow 1" [shadow]="1"></magary-button>
<magary-button label="Shadow 3" [shadow]="3"></magary-button>
<magary-button label="Rounded" [rounded]="true"></magary-button>`,
  states: `<magary-button label="Normal"></magary-button>
<magary-button label="Disabled" [disabled]="true"></magary-button>
<magary-button label="Loading..." [loading]="true"></magary-button>`,
  events: `<magary-button label="Click me" (buttonClick)="handleClick($event)"></magary-button>`,
};

@Component({
  selector: 'magary-view-button',
  imports: [CommonModule, MagaryButton, MagaryCard, Highlight],
  templateUrl: './view-button.html',
  styleUrl: './view-button.scss',
})
export class ViewButton {
  // Code Examples
  readonly importExample = CODE_EXAMPLES.import;
  readonly exampleBasic = CODE_EXAMPLES.basic;
  readonly exampleSeveritys = CODE_EXAMPLES.severity;
  readonly exampleSizes = CODE_EXAMPLES.sizes;
  readonly exampleVariants = CODE_EXAMPLES.variants;
  readonly exampleCustom = CODE_EXAMPLES.custom;
  readonly exampleState = CODE_EXAMPLES.states;
  readonly exampleEventClick = CODE_EXAMPLES.events;

  handleClick(event: Event) {
    console.log('Button clicked!', event);
  }
}
