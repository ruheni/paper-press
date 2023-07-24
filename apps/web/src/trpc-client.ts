import { AppRouter } from './server/trpc/routers';
import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';
import { env } from './server/env';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (env.VERCEL_URL)
    // reference for vercel.com
    return `https://${env.VERCEL_URL}`;
  if (env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${env.RENDER_INTERNAL_HOSTNAME}:${env.PORT}`;
  // assume localhost
  return `http://127.0.0.1:${env.PORT ?? 3000}`;
}

const url = `${getBaseUrl()}/api/trpc` as const;
console.log('trpc-client.ts: url:', url);

export const { provideTrpcClient, TrpcClient } = createTrpcClient<AppRouter>({
  url,
});

export function injectTrpcClient() {
  return inject(TrpcClient);
}
