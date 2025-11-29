import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { Schema } from './schema';

let db: ReturnType<typeof drizzle<Schema>>;

export function getDb() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const poolConnection = mysql.createPool(databaseUrl);
    db = drizzle(poolConnection);
  }

  return db;
}

export { db };