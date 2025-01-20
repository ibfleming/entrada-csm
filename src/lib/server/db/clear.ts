import { reset } from 'drizzle-seed';
import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from '$lib';
import { env } from '$env/dynamic/private';
import { exit } from 'process';

async function main() {
	try {
		// Establish database connection
		const db = drizzle(env.DATABASE_URL);

		// Reset tables
		await reset(db, schema);

		console.log('✅ Database reset successful');
		exit(0);
	} catch (e) {
		console.error('Error in reset:', e);
		exit(1);
	}
}

main();
