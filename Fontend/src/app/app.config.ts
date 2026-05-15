import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Importações do HTTP
import { provideHttpClient, withFetch } from '@angular/common/http';

// Importações de Idioma
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Importações de Gráficos
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// Executa a configuração do idioma
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideCharts(withDefaultRegisterables())
  ]
};