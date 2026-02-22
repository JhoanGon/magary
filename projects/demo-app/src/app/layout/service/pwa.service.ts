import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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

  // Signal to track if installation is available
  installable = signal(false);
  isIos = signal(false);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in standalone mode (already installed)
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches;

      // Check for iOS
      this.isIos.set(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !('MSStream' in window),
      );

      // Only show install button if NOT standalone and (is iOS OR generic installable logic pending)
      if (this.isIos() && !isStandalone) {
        this.installable.set(true);
      }

      window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the mini-infobar from appearing on mobile
        const beforeInstallPromptEvent =
          event as BeforeInstallPromptEvent;
        beforeInstallPromptEvent.preventDefault();
        // Stash the event so it can be triggered later.
        this.deferredPrompt = beforeInstallPromptEvent;
        // Update UI notify the user they can install the PWA
        this.installable.set(true);
      });

      window.addEventListener('appinstalled', () => {
        this.installable.set(false);
        this.deferredPrompt = null;
        console.log('PWA was installed');
      });
    }
  }

  install() {
    if (this.isIos()) {
      alert(
        'Para instalar en iOS:\n1. Pulsa el botón "Compartir" en la barra inferior\n2. Selecciona "Agregar a Inicio"',
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
        },
      );
    }
  }
}
