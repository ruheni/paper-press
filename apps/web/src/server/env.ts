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

const schema = envSchema.safeParse(process?.env);

if (!schema.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(schema.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = schema.data;
