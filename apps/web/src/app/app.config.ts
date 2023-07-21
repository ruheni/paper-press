import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTrpcClient } from '../trpc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),

    provideTrpcClient(),
  ],
};
