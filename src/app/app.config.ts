import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ThemePrimary } from './theme-primary';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import localeEsPE from '@angular/common/locales/es-PE';
import localeEnUS from '@angular/common/locales/en';
import localeEsAR from '@angular/common/locales/es-AR';
import localeEsCL from '@angular/common/locales/es-CL';
import localeEsCO from '@angular/common/locales/es-CO';
import localeEsUY from '@angular/common/locales/es-UY';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEsPE, 'es-PE');
registerLocaleData(localeEnUS, 'en-US');
registerLocaleData(localeEsAR, 'es-AR');
registerLocaleData(localeEsCL, 'es-CL');
registerLocaleData(localeEsCO, 'es-CO');
registerLocaleData(localeEsUY, 'es-UY');

export const appConfig: ApplicationConfig = {
  providers: [
    // {
    //   provide: LOCALE_ID, useValue: 'es-PE'
    // },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ThemePrimary
      }
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
      fallbackLang: 'en'
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    MessageService
  ]
};
