import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagaryInput, MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

const CODE_EXAMPLES = {
  import: `import { MagaryInput } from 'ng-magary';`,
  basic: `<magary-card [width]="'100%'" [shadow]="2" [borderRadius]="'1rem'" [backgroundColor]="'var(--surface-0)'">
  <div style="padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
    <magary-input
      [label]="'Nombre'"
      [placeholder]="'Escribe tu nombre'"
      [(value)]="inputValue"
    ></magary-input>
  </div>
</magary-card>`,
  types: `<magary-input [type]="'text'" [label]="'Texto'" [placeholder]="'Texto normal'"></magary-input>
<magary-input [type]="'email'" [label]="'Email'" [placeholder]="'usuario@email.com'"></magary-input>
<magary-input [type]="'password'" [label]="'Contraseña'" [placeholder]="'********'"></magary-input>
<magary-input [type]="'search'" [label]="'Buscar'" [placeholder]="'Buscar...'"></magary-input>`,
  sizes: `<magary-input [size]="'small'" [label]="'Pequeño'" [placeholder]="'Small'"></magary-input>
<magary-input [size]="'normal'" [label]="'Normal'" [placeholder]="'Normal'"></magary-input>
<magary-input [size]="'large'" [label]="'Grande'" [placeholder]="'Large'"></magary-input>`,
  variants: `<magary-input [variant]="'outlined'" [label]="'Outlined'" [placeholder]="'Outlined'"></magary-input>
<magary-input [variant]="'filled'" [label]="'Filled'" [placeholder]="'Filled'"></magary-input>
<magary-input [variant]="'underlined'" [label]="'Underlined'" [placeholder]="'Underlined'"></magary-input>`,
  validation: `<magary-input [label]="'Error'" [error]="'Mensaje de error'" [value]="'Invalido'"></magary-input>
<magary-input [label]="'Éxito'" [success]="true" [value]="'Valido'"></magary-input>
<magary-input [label]="'Requerido'" [required]="true" [placeholder]="'Campo obligatorio'"></magary-input>`,
  icons: `<magary-input [label]="'Prefijo'" [prefixIcon]="'fas fa-user'" [placeholder]="'Usuario'"></magary-input>
<magary-input [label]="'Sufijo'" [suffixIcon]="'fas fa-search'" [placeholder]="'Buscar'"></magary-input>
<magary-input [label]="'Ambos'" [prefixIcon]="'fas fa-envelope'" [suffixIcon]="'fas fa-check'" [placeholder]="'Email'"></magary-input>
<magary-input [label]="'Loading'" [loading]="true" [placeholder]="'Cargando...'"></magary-input>`,
  states: `<magary-input [label]="'Normal'" [placeholder]="'Normal'"></magary-input>
<magary-input [label]="'Deshabilitado'" [disabled]="true" [value]="'Deshabilitado'"></magary-input>
<magary-input [label]="'Solo Lectura'" [readonly]="true" [value]="'Solo lectura'"></magary-input>`,
};

@Component({
  selector: 'app-view-input',
  imports: [CommonModule, FormsModule, MagaryInput, MagaryCard, Highlight],
  templateUrl: './view-input.html',
  styleUrl: './view-input.scss',
})
export class ViewInput {
  // Signals for interactive demos
  inputValue = signal('');
  emailValue = signal('');
  passwordValue = signal('');
  searchValue = signal('');

  // Code Examples
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
