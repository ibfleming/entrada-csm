import { reset, seed } from 'drizzle-seed';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import { exit } from 'process';
import { lead } from './schema';

async function main() {
	try {
		// Establish database connection
		const db = drizzle(env.DATABASE_URL!);

		// Reset tables
		await reset(db, schema);

		// Seed tables
		await seed(db, { lead }).refine((f) => ({
			lead: {
				columns: {
					phoneNumber: f.phoneNumber({
						prefixes: ['1'],
						generatedDigitsNumbers: [10]
					}),
					floorPlan: f.valuesFromArray({
						values: ['1 BED 1 BATH', '2 BED 2 BATH', '3 BED 2 BATH', '4 BED 4 BATH']
					})
				},
				count: 50
			}
		}));

		console.log('✅ Database seed successful');
		exit(0);
	} catch (e) {
		console.error('Error in seeding:', e);
		exit(1);
	}
}

main();
