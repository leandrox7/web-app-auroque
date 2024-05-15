import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { LoaderInterceptor } from './components/loader.intercept';
import { LoaderModule } from './components/loader/loader.module';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),  importProvidersFrom(HttpClientModule) , LoaderModule, provideHttpClient(), {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true  // Isso é necessário porque HTTP_INTERCEPTORS é um token multi-provedor
  } ]
};
