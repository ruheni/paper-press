import { AppRouter } from './server/trpc/routers';
import { createTrpcClient } from '@analogjs/trpc';
import { inject } from '@angular/core';

function getBaseUrl() {
  if (typeof window !== 'undefined' || typeof process === 'undefined')
    // browser should use relative path
    return '';
  if (process.env['VERCEL_URL'])
    // reference for vercel.com
    return `https://${process.env['VERCEL_URL']}`;
  if (process.env['RENDER_INTERNAL_HOSTNAME'])
    // reference for render.com
    return `http://${process.env['RENDER_INTERNAL_HOSTNAME']}:${process.env['PORT']}`;
  if (process.env['DEPLOY_URL'])
    // reference for netlify.com
    return `http://${process.env['DEPLOY_URL']}`;

  // assume localhost
  return `http://127.0.0.1:${process.env['PORT'] ?? 4200}`;
}

const url = `${getBaseUrl()}/api/trpc` as const;
console.log('trpc-client.ts: url:', url);

export const { provideTrpcClient, TrpcClient } = createTrpcClient<AppRouter>({
  url,
});

export function injectTrpcClient() {
  return inject(TrpcClient);
}
