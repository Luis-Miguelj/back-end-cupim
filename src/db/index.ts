import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(Bun.env.DATABASE_URL as string)
