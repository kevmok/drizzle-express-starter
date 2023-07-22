import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'mysql2',
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.PLANETSCALE_DATABASE_URL || '',
  },
} satisfies Config;
