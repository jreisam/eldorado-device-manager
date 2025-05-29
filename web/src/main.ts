
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode, ApplicationRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import environment from './environments/environment';
import 'zone.js';

// Ativar modo de produção se não estiver em desenvolvimento
if (environment.production) {
  enableProdMode();
}

// Configurações mais modernas para inicialização
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // Preservar espaço em branco
    preserveWhitespaces: false,
    // Usar JIT em vez de AOT (opcional, depende do seu fluxo de compilação)
    ngZoneEventCoalescing: true,
    ngZoneRunCoalescing: true
  })
  .then(moduleRef => {
    // Ferramenta de depuração para Angular DevTools
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];
    // Isso habilita o suporte para o Angular DevTools
    if (!environment.production) {
      enableDebugTools(componentRef);
    }

    console.log('Aplicação inicializada com sucesso!');
  })
  .catch(err => console.error('Erro ao inicializar a aplicação:', err));
