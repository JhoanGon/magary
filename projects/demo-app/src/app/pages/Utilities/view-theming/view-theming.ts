import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-view-theming',
  standalone: true,
  imports: [
    CommonModule,
    Highlight,
    MagaryTabs,
    MagaryTab,
    LucideAngularModule,
  ],
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
  }

  // Establecer un tema específico
  // 'light', 'dark' o el nombre de tu tema personalizado (ej: 'purple')
  setPurpleTheme() {
    this.themeService.setTheme('purple');
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

  htmlExample = `
<!-- En tu template (app.component.html) -->
<div class="theme-controls">
  <!-- Botón para alternar tema -->
  <magary-button 
    label="Toggle Theme" 
    (click)="toggleTheme()">
  </magary-button>

  <!-- Botón para tema específico -->
  <magary-button 
    label="Purple Theme" 
    severity="help"
    (click)="setPurpleTheme()">
  </magary-button>
</div>`;
}
