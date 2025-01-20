import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const globalDatabase = globalThis as unknown as {
	connection: postgres.Sql | undefined;
};

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const connection = globalDatabase.connection ?? postgres(env.DATABASE_URL);

if (env.PROJ_ENV !== 'production') globalDatabase.connection = connection;

export const db = drizzle(connection, { schema, logger: false });

export type db = typeof db;
export default db;
