import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PwaService } from './layout/service/pwa.service';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo-app');
  private pwaService = inject(PwaService);
}
