import { Component } from '@angular/core';
import { MagaryButton } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'magary-view-button',
  imports: [MagaryButton, Highlight],
  templateUrl: './view-button.html',
  styleUrl: './view-button.scss',
})
export class ViewButton {
  importExample = "import { MagaryButton } from 'ng-magary';";

  exampleBasic = `
  <magary-button label="Button"></magary-button>
  <magary-button label="Home" icon="fas fa-home"></magary-button>
  <magary-button icon="fas fa-heart"></magary-button>
  <magary-button label="Loading..." [loading]="true"></magary-button>`;

  exampleSeveritys = `
  <magary-button label="Primary" severity="primary"></magary-button>
  <magary-button label="Secondary" severity="secondary"></magary-button>
  <magary-button label="Success" severity="success"></magary-button>
  <magary-button label="Info" severity="info"></magary-button>
  <magary-button label="Warning" severity="warning"></magary-button>
  <magary-button label="Danger" severity="danger"></magary-button>
  <magary-button label="Help" severity="help"></magary-button>`;

  exampleVariants = `
  <magary-button label="Solid" variant="solid" [customBackgroundColor]="'#40cae7'"></magary-button>
  <magary-button label="Outlined" variant="outlined" severity="primary"></magary-button>
  <magary-button label="Text" variant="text" severity="primary"></magary-button>`;

  exampleCustom = `
  <magary-button label="Shadow 1" [shadow]="1"></magary-button>
  <magary-button label="Shadow 3" [shadow]="3"></magary-button>
  <magary-button label="Shadow 5" [shadow]="5"></magary-button>
  <magary-button label="Rounded" [rounded]="true"></magary-button>`;

  exampleState = `
  <magary-button label="Normal"></magary-button>
  <magary-button label="Disabled" [disabled]="true"></magary-button>
  <magary-button label="Loading..." [loading]="true"></magary-button>`;

  exampleEventClick = `
  <magary-button
    label="Click me"
    (buttonClick)="handleClick($event)">
  </magary-button>`;

  exampleLoginForm = `
  <form>
    <!-- Campos del formulario -->

    <div class="button-group">
      <magary-button
        label="Iniciar Sesión"
        severity="primary"
        icon="fas fa-sign-in-alt"
        [loading]="isLoading"
        (buttonClick)="login()">
      </magary-button>

      <magary-button
        label="Cancelar"
        variant="outlined"
        severity="secondary"
        (buttonClick)="cancel()">
      </magary-button>
    </div>
  </form>`;

  exampleToolbar = `
  <div class="toolbar">
    <magary-button
      icon="fas fa-plus"
      severity="success"
      [rounded]="true"
      [shadow]="2"
      (buttonClick)="create()">
    </magary-button>

    <magary-button
      icon="fas fa-edit"
      severity="info"
      [disabled]="!selectedItem"
      (buttonClick)="edit()">
    </magary-button>

    <magary-button
      icon="fas fa-trash"
      severity="danger"
      variant="outlined"
      [disabled]="!selectedItem"
      (buttonClick)="delete()">
    </magary-button>
  </div>`;
}
