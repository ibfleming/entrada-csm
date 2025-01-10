import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	try {
		// Run a simple query to check the database connection
		await db.execute(sql`SELECT 1`);
		return new Response(JSON.stringify({ status: 'ok', message: 'Database connected' }), {
			status: 200
		});
	} catch (error) {
		console.error('Health check failed:', error);
		return new Response(
			JSON.stringify({ status: 'error', message: 'Database connection failed' }),
			{
				status: 500
			}
		);
	}
};
