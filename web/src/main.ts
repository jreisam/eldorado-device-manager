import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode, ApplicationRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import environment from './environments/environment';
import 'zone.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false,
    ngZoneEventCoalescing: true,
    ngZoneRunCoalescing: true,
  })
  .then(moduleRef => {
    // Ferramenta de depuração para Angular DevTools
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];
    if (!environment.production) {
      enableDebugTools(componentRef);
    }

    console.log('Aplicação inicializada com sucesso!');
  })
  .catch(err => console.error('Erro ao inicializar a aplicação:', err));
