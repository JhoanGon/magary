import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  installable = signal(false);
  isIos = signal(false);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  constructor() {
    const view = this.document.defaultView;
    if (isPlatformBrowser(this.platformId) && view) {
      const isStandalone = view.matchMedia(
        '(display-mode: standalone)',
      ).matches;
      const navigator = view.navigator;

      this.isIos.set(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !('MSStream' in view),
      );

      if (this.isIos() && !isStandalone) {
        this.installable.set(true);
      }

      view.addEventListener('beforeinstallprompt', (event) => {
        const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
        beforeInstallPromptEvent.preventDefault();
        this.deferredPrompt = beforeInstallPromptEvent;
        this.installable.set(true);
      });

      view.addEventListener('appinstalled', () => {
        this.installable.set(false);
        this.deferredPrompt = null;
        console.log('PWA was installed');
      });
    }
  }

  install() {
    if (this.isIos()) {
      this.document.defaultView?.alert(
        'Para instalar en iOS:\n1. Pulsa el boton "Compartir" en la barra inferior\n2. Selecciona "Agregar a Inicio"',
      );
      return;
    }

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
        this.installable.set(false);
      });
    }
  }
}
