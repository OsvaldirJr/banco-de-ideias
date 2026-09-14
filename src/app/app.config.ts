import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/interceptor.http';
import { errorInterceptor } from './core/interceptors/error-interceptor.http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withXhr(), withInterceptors([authInterceptor, errorInterceptor]))]
};
