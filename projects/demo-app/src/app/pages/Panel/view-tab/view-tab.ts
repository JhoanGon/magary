import { Component } from '@angular/core';
import { MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
@Component({
  selector: 'magary-view-tab',
  imports: [MagaryTabs, MagaryTab, Highlight],
  templateUrl: './view-tab.html',
  styleUrl: './view-tab.scss',
})
export class ViewTab {
  importExample = "import { MagaryTabs, MagaryTab } from 'ng-magary';";
  exampleTab = `
  <magary-tabs [backgroundLine]="'#007bff'" [positionContent]="'flex-start'">
    <magary-tab label="Inicio">
      <h2>Bienvenido</h2>
      <p>Contenido de la pestaña de inicio.</p>
    </magary-tab>
    <magary-tab label="Perfil">
      <h2>Tu perfil</h2>
      <p>Detalles personales, ajustes, etc.</p>
    </magary-tab>
    <magary-tab label="Ayuda">
      <p>Aquí puedes encontrar asistencia.</p>
    </magary-tab>
    <magary-tab label="Contacto">
      <p>Aquí puedes encontrar los numeros de contacto.</p>
    </magary-tab>
  </magary-tabs>`;
  exampleBasic = `
  <magary-tabs backgroundLine="#ff4081">
    <magary-tab label="Perfil">
      <p>Contenido del perfil</p>
    </magary-tab>
    <magary-tab label="Configuración">
      <p>Contenido de configuración</p>
    </magary-tab>
    <magary-tab label="Seguridad">
      <p>Contenido de seguridad</p>
    </magary-tab>
  </magary-tabs>`;
}
