import { Component } from '@angular/core';
import { MagaryInput, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'magary-view-input',
  imports: [MagaryInput, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-input.html',
  styleUrl: './view-input.scss',
})
export class ViewInput {
  readonly tabsConfig = {
    backgroundLine: '#ed2c44',
    positionContent: 'flex-start' as const,
    background: '#282c34',
    heightLine: '4px',
  };

  inputValue = '';
  emailValue = '';
  passwordValue = '';
  searchValue = '';
  eventValue = '';
  lastEvent = 'Ningún evento aún';

  onInputChange(value: string): void {
    this.inputValue = value;
    console.log('Input changed:', value);
  }

  onEmailChange(value: string): void {
    this.emailValue = value;
  }

  onPasswordChange(value: string): void {
    this.passwordValue = value;
  }

  onSearchChange(value: string): void {
    this.searchValue = value;
  }

  onEventValueChange(value: string): void {
    this.eventValue = value;
    this.lastEvent = `valueChange: ${value}`;
  }

  onFocus(event: Event): void {
    this.lastEvent = 'focus';
    console.log('Input focused:', event);
  }

  onBlur(event: Event): void {
    this.lastEvent = 'blur';
    console.log('Input blurred:', event);
  }

  onIconClick(type: 'prefix' | 'suffix'): void {
    this.lastEvent = `iconClick: ${type}`;
    console.log('Icon clicked:', type);
  }

  importExample = `import { MagaryInput } from 'ng-magary';`;

  // Ejemplos básicos separados
  basicExample = `<magary-input
  [value]="inputValue"
  [placeholder]="'Escribe algo...'"
  [label]="'Nombre'"
  (valueChange)="onInputChange($event)"
/>`;

  basicExampleWithIcon = `<magary-input
  [label]="'Usuario'"
  [placeholder]="'Nombre de usuario'"
  [prefixIcon]="'fas fa-user'"
  [value]="inputValue"
  (valueChange)="onInputChange($event)"
/>`;

  basicExampleReadonly = `<magary-input
  [label]="'Solo lectura'"
  [placeholder]="'No puedes editar'"
  [readonly]="true"
  [value]="'Valor fijo'"
/>`;

  basicExampleDisabled = `<magary-input
  [label]="'Deshabilitado'"
  [placeholder]="'Campo deshabilitado'"
  [disabled]="true"
/>`;

  // Ejemplos de tipos separados
  typesExampleText = `<magary-input
  [type]="'text'"
  [label]="'Texto'"
  [placeholder]="'Escribe texto'"
  [value]="inputValue"
  (valueChange)="onInputChange($event)"
/>`;

  typesExampleEmail = `<magary-input
  [type]="'email'"
  [label]="'Email'"
  [placeholder]="'tu@email.com'"
  [value]="emailValue"
  (valueChange)="onEmailChange($event)"
/>`;

  typesExamplePassword = `<magary-input
  [type]="'password'"
  [label]="'Contraseña'"
  [placeholder]="'Tu contraseña'"
  [value]="passwordValue"
  (valueChange)="onPasswordChange($event)"
/>`;

  typesExampleSearch = `<magary-input
  [type]="'search'"
  [label]="'Buscar'"
  [placeholder]="'Buscar...'"
  [prefixIcon]="'fas fa-search'"
  [value]="searchValue"
  (valueChange)="onSearchChange($event)"
/>`;

  // Ejemplos de tamaños separados
  sizesExampleSmall = `<magary-input
  [size]="'small'"
  [label]="'Pequeño'"
  [placeholder]="'Input pequeño'"
/>`;

  sizesExampleNormal = `<magary-input
  [size]="'normal'"
  [label]="'Normal'"
  [placeholder]="'Input normal'"
/>`;

  sizesExampleLarge = `<magary-input
  [size]="'large'"
  [label]="'Grande'"
  [placeholder]="'Input grande'"
/>`;

  // Ejemplos de variantes separados
  variantsExampleOutlined = `<magary-input
  [variant]="'outlined'"
  [label]="'Outlined'"
  [placeholder]="'Estilo outlined'"
/>`;

  variantsExampleFilled = `<magary-input
  [variant]="'filled'"
  [label]="'Filled'"
  [placeholder]="'Estilo filled'"
/>`;

  variantsExampleUnderlined = `<magary-input
  [variant]="'underlined'"
  [label]="'Underlined'"
  [placeholder]="'Estilo underlined'"
/>`;

  // Ejemplos de validación separados
  validationExampleError = `<magary-input
  [label]="'Campo con error'"
  [placeholder]="'Email inválido'"
  [error]="'Por favor ingresa un email válido'"
  [value]="'email-invalido'"
/>`;

  validationExampleSuccess = `<magary-input
  [label]="'Campo exitoso'"
  [placeholder]="'Email válido'"
  [success]="true"
  [value]="'usuario@ejemplo.com'"
/>`;

  validationExampleRequired = `<magary-input
  [label]="'Campo requerido'"
  [placeholder]="'Campo obligatorio'"
  [required]="true"
  [helpText]="'Este campo es obligatorio'"
/>`;

  // Ejemplos de iconos separados
  iconsExamplePrefix = `<magary-input
  [label]="'Usuario'"
  [placeholder]="'Nombre de usuario'"
  [prefixIcon]="'fas fa-user'"
  (iconClick)="onIconClick($event)"
/>`;

  iconsExampleMultiple = `<magary-input
  [label]="'Búsqueda'"
  [placeholder]="'Buscar productos...'"
  [prefixIcon]="'fas fa-search'"
  [suffixIcon]="'fas fa-times'"
  (iconClick)="onIconClick($event)"
/>`;

  iconsExampleLoading = `<magary-input
  [label]="'Cargando'"
  [placeholder]="'Procesando...'"
  [loading]="true"
  [disabled]="true"
/>`;

  // Ejemplos de estados separados
  statesExampleNormal = `<magary-input
  [label]="'Campo normal'"
  [placeholder]="'Input normal'"
/>`;

  statesExampleDisabled = `<magary-input
  [label]="'Campo deshabilitado'"
  [placeholder]="'No puedes escribir aquí'"
  [disabled]="true"
  [value]="'Valor fijo'"
/>`;

  statesExampleReadonly = `<magary-input
  [label]="'Campo solo lectura'"
  [placeholder]="'Solo lectura'"
  [readonly]="true"
  [value]="'Solo puedes leer esto'"
/>`;

  statesExampleWithLimit = `<magary-input
  [label]="'Con límite'"
  [placeholder]="'Máximo 20 caracteres'"
  [maxLength]="20"
  [helpText]="'Máximo 20 caracteres permitidos'"
/>`;

  eventsExample = `<magary-input
  [label]="'Input con eventos'"
  [placeholder]="'Escribe algo...'"
  [value]="inputValue"
  [prefixIcon]="'fas fa-edit'"
  (valueChange)="onInputChange($event)"
  (iconClick)="onIconClick($event)"
/>`;

  // Ejemplos de eventos separados
  eventsExampleBasic = `<magary-input
  [label]="'Input con eventos'"
  [placeholder]="'Escribe algo...'"
  [value]="inputValue"
  [prefixIcon]="'fas fa-edit'"
  (valueChange)="onInputChange($event)"
  (iconClick)="onIconClick($event)"
/>`;

  eventsExampleComplete = `<magary-input
  [label]="'Eventos completos'"
  [placeholder]="'Prueba todos los eventos'"
  [value]="eventValue"
  [suffixIcon]="'fas fa-times'"
  (valueChange)="onEventValueChange($event)"
  (inputFocus)="onFocus($event)"
  (inputBlur)="onBlur($event)"
  (iconClick)="onIconClick($event)"
/>`;

  eventsExampleTS = `// Manejo de eventos en el componente
onEventValueChange(value: string): void {
  this.eventValue = value;
  this.lastEvent = \`valueChange: \${value}\`;
}

onFocus(event: Event): void {
  this.lastEvent = 'focus';
  console.log('Input focused:', event);
}

onBlur(event: Event): void {
  this.lastEvent = 'blur';
  console.log('Input blurred:', event);
}

onIconClick(type: 'prefix' | 'suffix'): void {
  this.lastEvent = \`iconClick: \${type}\`;
  console.log('Icon clicked:', type);
}`;

  // Ejemplos de accesibilidad separados
  accessibilityExampleLabels = `<magary-input
  [label]="'Nombre completo'"
  [placeholder]="'Escribe tu nombre completo'"
  [helpText]="'Ingresa tu nombre y apellido completos'"
  [required]="true"
/>`;

  accessibilityExampleNavigation = `<magary-input
  [label]="'Email de contacto'"
  [placeholder]="'tu@email.com'"
  [type]="'email'"
  [helpText]="'Usa Tab para navegar entre campos'"
/>`;

  accessibilityExampleError = `<magary-input
  [label]="'Contraseña'"
  [type]="'password'"
  [error]="'La contraseña debe tener al menos 8 caracteres'"
  [helpText]="'Mínimo 8 caracteres'"
/>`;

  accessibilityExampleDisabled = `<magary-input
  [label]="'Usuario del sistema'"
  [value]="'admin@sistema.com'"
  [disabled]="true"
  [helpText]="'Este campo no se puede modificar'"
/>`;

  formExample = `<form class="registration-form">
  <magary-input
    [label]="'Nombre completo'"
    [placeholder]="'Juan Pérez'"
    [required]="true"
    [prefixIcon]="'fas fa-user'"
  />

  <magary-input
    [type]="'email'"
    [label]="'Correo electrónico'"
    [placeholder]="'juan@ejemplo.com'"
    [required]="true"
    [prefixIcon]="'fas fa-envelope'"
  />

  <magary-input
    [type]="'password'"
    [label]="'Contraseña'"
    [placeholder]="'Mínimo 8 caracteres'"
    [required]="true"
    [helpText]="'Debe contener al menos 8 caracteres'"
  />
</form>`;

  searchExample = `<div class="search-filters">
  <magary-input
    [type]="'search'"
    [label]="'Buscar productos'"
    [placeholder]="'Nombre, categoría, descripción...'"
    [prefixIcon]="'fas fa-search'"
    [suffixIcon]="'fas fa-times'"
    [value]="searchValue"
    (valueChange)="onSearchChange($event)"
    (iconClick)="onIconClick($event)"
  />

  <magary-input
    [label]="'Precio mínimo'"
    [type]="'number'"
    [placeholder]="'0'"
    [prefixIcon]="'fas fa-dollar-sign'"
    [size]="'small'"
  />

  <magary-input
    [label]="'Precio máximo'"
    [type]="'number'"
    [placeholder]="'1000'"
    [prefixIcon]="'fas fa-dollar-sign'"
    [size]="'small'"
  />
</div>`;
}
