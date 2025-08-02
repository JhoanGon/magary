import { Component, signal } from '@angular/core';
import { Button, Card, Tab, Tabs } from 'ng-magary';

@Component({
  selector: 'app-root',
  imports: [Card, Tabs, Tab, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo-app');
}
