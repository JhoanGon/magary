import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-view-theming',
  standalone: true,
  imports: [CommonModule, Highlight],
  templateUrl: './view-theming.html',
  styleUrl: './view-theming.scss',
})
export class ViewTheming {
  usageExample = `
import { Component, inject } from '@angular/core';
import { MagaryThemeService } from 'ng-magary';

@Component({ ... })
export class AppComponent {
  themeService = inject(MagaryThemeService);

  // Cambiar a tema oscuro
  switchToDark() {
    this.themeService.setTheme('dark');
  }

  // Alternar entre temas disponibles
  toggleTheme() {
    this.themeService.toggleTheme(); 
    // O usa setTheme('purple') para temas personalizados
  }
}`;

  cssExample = `
// En tu styles.scss global

/* Definición del Tema "Purple" */
[data-theme="purple"] {
  // Fondos
  --surface-0: #2d1b4e;   // Color principal de tarjetas
  --surface-50: #1a102e;  // Color de fondo de la app
  --surface-100: #2d1b4e; // Elementos secundarios
  
  // Texto
  --text-primary: #f3e8ff;
  --text-secondary: #d8b4fe;

  // Color Primario (Acentos)
  --primary-500: #a855f7;
  --primary-600: #9333ea;
  
  // Opcional: Gradientes personalizados
  --gradient-text: linear-gradient(135deg, #a855f7, #ec4899);
}`;
}
