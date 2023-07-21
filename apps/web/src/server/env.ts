// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { z } from 'zod';

/*eslint sort-keys: "error"*/
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const schema = envSchema.safeParse(process.env);

if (!schema.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(schema.error.format(), null, 4),
  );
  process.exit(1);
}

export const env = schema.data;