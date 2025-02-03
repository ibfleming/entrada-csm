import { reset, seed } from 'drizzle-seed';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';
import { exit } from 'process';
import { lead, resident } from './schema';

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
				count: 256
			}
		}));

		// Seed residents
		await seed(db, { resident }).refine((f) => ({
			resident: {
				columns: {
					phoneNumber: f.phoneNumber({
						prefixes: ['1'],
						generatedDigitsNumbers: [10]
					}),
					floorPlan: f.valuesFromArray({
						values: ['1 BED 1 BATH', '2 BED 2 BATH', '3 BED 2 BATH', '4 BED 4 BATH']
					}),
					leaseTerm: f.valuesFromArray({
						values: ['2024-2025', '2025-2026', '2026-2027']
					}),
					birthDate: f.date({
						minDate: new Date('2000-01-01'),
						maxDate: new Date('2005-01-01')
					}),
					studentStatus: f.valuesFromArray({
						values: ['STUDENT', 'NON-STUDENT', 'OTHER']
					})
				},
				count: 128
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
