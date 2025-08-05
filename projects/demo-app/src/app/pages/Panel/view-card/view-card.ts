import { Component } from '@angular/core';
import { MagaryButton, MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'magary-view-card',
  imports: [MagaryCard, MagaryButton, Highlight],
  templateUrl: './view-card.html',
  styleUrl: './view-card.scss',
})
export class ViewCard {
  importExample = "import { MagaryCard } from 'ng-magary';";

  exampleBasic = `
  <magary-card
    [width]="'300px'"
    [shadow]="5"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ccf0f7'"
  >
    <div slot="header">
      <h3>Encabezado</h3>
    </div>
    <p>Este es el contenido principal de la tarjeta.</p>
    <div slot="footer">
      <magary-button label="Click" severity="primary"></magary-button>
    </div>
  </magary-card>`;

  exampleImage = `
  <magary-card
    [img]="'/assets/Magary.png'"
    [positionImage]="'top'"
    [imageSize]="'300px'"
    [width]="'200px'"
    [shadow]="2"
    [borderRadius]="'1rem'"
    [backgroundColor]="'#ccf0f7'"
  >
    <div slot="header">
      <h3>Encabezado</h3>
    </div>
    <p>Este es el contenido principal de la tarjeta.</p>
    <div slot="footer">
      <magary-button label="Click" severity="primary"></magary-button>
    </div>
  </magary-card>`;

  exampleUser = `
  <magary-card
    [img]="'/assets/avatar.jpg'"
    [positionImage]="'left'"
    [width]="'400px'"
    [gap]="'1.5rem'">

    <div slot="header"><h3>Perfil de Usuario</h3></div>
    <p>Nombre, correo, rol y otra información relevante.</p>
    <div slot="footer"><button>Editar</button></div>
  </magary-card>`;
}
