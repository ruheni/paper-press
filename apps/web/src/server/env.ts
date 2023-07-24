// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { z } from 'zod';

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  VERCEL_URL: z.string().optional(),
  RENDER_INTERNAL_HOSTNAME: z.string().optional(),
  PORT: z.string().optional(),
});

let envData = {} as z.infer<typeof envSchema>;

// check if process is defined
if (typeof process === 'undefined') {
  envData = {
    NODE_ENV: 'development',
  };
} else {
  const schema = envSchema.safeParse({
    NODE_ENV: process?.env?.['NODE_ENV'],
    VERCEL_URL: process?.env?.['VERCEL_URL'],
    RENDER_INTERNAL_HOSTNAME: process?.env?.['RENDER_INTERNAL_HOSTNAME'],
    PORT: process?.env?.['PORT'],
  });

  if (!schema.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(schema.error.format(), null, 4)
    );
    process.exit(1);
  }

  envData = schema.data;
}
export const env = envData;
